"""
Scraper de Prospectos: Perfumerías y Tiendas de Fragancias en México
Herramienta: Scrapling (DynamicFetcher con Playwright headless)
Objetivo  : 1,000 negocios calificados SIN sitio web profesional
Fuente    : Google Maps

Selectores validados en pruebas reales:
  .qBF1Pd    → Nombre del negocio
  .MW4etd    → Rating  (texto "4,3")
  .UY7F9     → Reseñas (texto "(4953)")
  .UsdlK     → Teléfono
  span[role] → aria-label con "X,X estrellas Y reseñas"
  a.hfpxzc   → Link de Google Maps
"""

import csv
import os
import random
import re
import sys
import time
from datetime import datetime
from urllib.parse import quote

# Forzar salida UTF-8 para caracteres especiales
if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")

from scrapling import DynamicFetcher

# ─────────────────────────────────────────────────────────────
# CONFIGURACIÓN
# ─────────────────────────────────────────────────────────────
DESKTOP    = os.path.join(os.path.expanduser("~"), "Desktop")
OUTPUT_CSV = os.path.join(DESKTOP, "1000_prospectos_perfumerias_mexico.csv")
META_TOTAL = 1000
MIN_RESENAS = 20
MIN_RATING  = 4.0
SCROLL_REPS = 10    # iteraciones de scroll por página
SCROLL_PX   = 2500  # píxeles por scroll
SCROLL_WAIT = 1.4   # segundos entre scrolls
DELAY_MIN   = 2.0
DELAY_MAX   = 3.5

CIUDADES = [
    "Ciudad de México",
    "Guadalajara Jalisco",
    "Monterrey Nuevo León",
    "Puebla Puebla",
    "Tijuana Baja California",
    "León Guanajuato",
    "Querétaro Querétaro",
    "Mérida Yucatán",
    "San Luis Potosí",
    "Cancún Quintana Roo",
]

TERMINOS = [
    "perfumería",
    "tienda de perfumes",
    "tienda de fragancias",
    "perfumes y cosméticos",
    "cosméticos y belleza",
    "productos de belleza",
    "maquillaje y perfumes",
    "cosmetiquería",
]

# Dominios que NO son sitios web profesionales del negocio
NO_PROFESIONAL = {
    "facebook.com", "fb.com", "m.facebook.com",
    "instagram.com",
    "linktr.ee", "linktree.com",
    "twitter.com", "x.com",
    "tiktok.com", "youtube.com",
    "wa.me", "api.whatsapp.com", "whatsapp.com",
    "google.com", "maps.app.goo.gl",
    "yelp.com", "foursquare.com", "tripadvisor.com",
    "mercadolibre.com", "amazon.com.mx",
    "wordpress.com", "blogspot.com",
    "wix.com", "weebly.com", "jimdo.com",
}


# ─────────────────────────────────────────────────────────────
# FUNCIONES DE APOYO
# ─────────────────────────────────────────────────────────────

def es_no_profesional(url: str) -> bool:
    """True si la URL es vacía, redes sociales o directorio gratuito."""
    if not url or url.strip() == "":
        return True
    u = url.lower()
    return any(d in u for d in NO_PROFESIONAL)


def parse_rating(txt: str) -> float:
    """Convierte '4,3' o '4.3' a float 4.3"""
    txt = txt.strip().replace(",", ".")
    m = re.search(r"\d+\.\d+|\d+", txt)
    return float(m.group()) if m else 0.0


def parse_resenas(txt: str) -> int:
    """Convierte '(4.953)' o '(4953)' o '4953 reseñas' a int."""
    # Eliminar puntuación de miles y paréntesis
    clean = re.sub(r"[().,()\s]", "", txt)
    m = re.search(r"\d+", clean)
    return int(m.group()) if m else 0


def ciudad_corta(ciudad: str) -> str:
    return ciudad.split()[0]


def build_url(termino: str, ciudad: str) -> str:
    return f"https://www.google.com/maps/search/{quote(termino + ' en ' + ciudad)}"


def delay_humano():
    time.sleep(random.uniform(DELAY_MIN, DELAY_MAX))


# ─────────────────────────────────────────────────────────────
# FUNCIÓN DE SCROLL (recibe Playwright page)
# ─────────────────────────────────────────────────────────────

def scroll_results(page):
    js = """
    (() => {
        const feed = document.querySelector('[role="feed"]');
        if (feed) { feed.scrollBy(0, 2500); }
        else { window.scrollBy(0, 2500); }
    })()
    """
    for _ in range(SCROLL_REPS):
        try:
            page.evaluate(js)
        except Exception:
            pass
        time.sleep(SCROLL_WAIT)


# ─────────────────────────────────────────────────────────────
# PARSEO DE UNA TARJETA .Nv2PK
# ─────────────────────────────────────────────────────────────

def parse_card(card, ciudad: str) -> dict | None:
    try:
        # ── Descartar anuncios patrocinados ──────────────────
        if card.css(".kpih0e"):
            return None

        # ── Nombre ───────────────────────────────────────────
        nombre = ""
        name_els = card.css(".qBF1Pd")
        if name_els:
            nombre = name_els[0].text.strip()
        if not nombre:
            nombre = card.attrib.get("aria-label", "").strip()
        if not nombre:
            return None

        # ── Rating ───────────────────────────────────────────
        calificacion = 0.0
        mw_els = card.css(".MW4etd")
        if mw_els:
            calificacion = parse_rating(mw_els[0].text or "0")

        # Fallback: leer del aria-label de span[role]
        if calificacion == 0.0:
            for sp in card.css("span[role]"):
                lbl = sp.attrib.get("aria-label", "")
                if "estrell" in lbl or "star" in lbl:
                    m = re.search(r"(\d+[,.]?\d*)", lbl)
                    if m:
                        calificacion = parse_rating(m.group(1))
                    break

        # ── Número de reseñas ─────────────────────────────────
        resenas = 0
        uy_els = card.css(".UY7F9")
        if uy_els:
            resenas = parse_resenas(uy_els[0].text or "0")

        # Fallback: leer del aria-label
        if resenas == 0:
            for sp in card.css("span[role]"):
                lbl = sp.attrib.get("aria-label", "")
                if "estrell" in lbl or "star" in lbl:
                    m = re.search(r"(\d[\d.]*)\s*(rese|opini|revi)", lbl)
                    if m:
                        resenas = parse_resenas(m.group(1))
                    break

        # ── Filtros de calificación ──────────────────────────
        if calificacion < MIN_RATING:
            return None
        if resenas < MIN_RESENAS:
            return None

        # ── Teléfono ─────────────────────────────────────────
        telefono = ""
        tel_els = card.css(".UsdlK")
        if tel_els:
            telefono = tel_els[0].text.strip()
        if not telefono:
            for lnk in card.css("a[href]"):
                h = lnk.attrib.get("href", "")
                if h.startswith("tel:"):
                    telefono = h[4:].strip()
                    break

        # ── Dirección ────────────────────────────────────────
        direccion = ""
        w4_divs = card.css(".W4Efsd")
        for div in w4_divs:
            txt = div.text.strip()
            # Dirección suele tener números de calle
            if txt and len(txt) > 8 and any(c.isdigit() for c in txt):
                if telefono and txt == telefono:
                    continue
                if "Abre" in txt or "Cierra" in txt or "Cerrado" in txt:
                    continue
                direccion = txt
                break
        if not direccion and len(w4_divs) >= 2:
            direccion = w4_divs[-1].text.strip()

        # ── Sitio Web ────────────────────────────────────────
        enlace_actual = ""
        # Buscar links externos en la tarjeta
        for lnk in card.css("a[href]"):
            h = lnk.attrib.get("href", "")
            if (
                h.startswith("http")
                and "google.com" not in h
                and "goo.gl" not in h
                and not h.startswith("tel:")
            ):
                enlace_actual = h
                break

        # ── Filtro de sitio web profesional ──────────────────
        if not es_no_profesional(enlace_actual):
            return None  # tiene web propia → no es prospecto

        # ── Link de Google Maps ───────────────────────────────
        maps_link = ""
        hfp = card.css("a.hfpxzc")
        if hfp:
            href = hfp[0].attrib.get("href", "")
            # Limpiar parámetros de tracking pero mantener la URL de place
            maps_link = re.sub(r"\?.*$", "", href)
        if not maps_link:
            for lnk in card.css("a[href]"):
                h = lnk.attrib.get("href", "")
                if "/maps/place/" in h:
                    maps_link = re.sub(r"\?.*$", "", h)
                    break

        return {
            "Ciudad"          : ciudad_corta(ciudad),
            "Nombre"          : nombre,
            "Telefono"        : telefono,
            "Direccion"       : direccion,
            "Calificacion"    : f"{calificacion:.1f}".replace(".", ","),
            "Num_Resenas"     : resenas,
            "Enlace_Actual"   : enlace_actual,
            "Link_Google_Maps": maps_link,
        }

    except Exception:
        return None


# ─────────────────────────────────────────────────────────────
# CLASE SCRAPER
# ─────────────────────────────────────────────────────────────

class ScraperPerfumerias:

    def __init__(self):
        self.resultados: list[dict] = []
        self.vistos: set[str] = set()
        self.stats: dict[str, int] = {}

    def _fetch_busqueda(self, url: str, ciudad: str) -> int:
        try:
            page = DynamicFetcher.fetch(
                url,
                headless=True,
                network_idle=False,
                timeout=40000,
                wait=3000,
                page_action=scroll_results,
                disable_resources=True,
                google_search=True,
            )
        except Exception as e:
            print(f"     [!] Error al cargar: {e}")
            return 0

        cards = page.css(".Nv2PK")
        if not cards:
            print("     [!] Sin tarjetas — posible CAPTCHA o sin resultados")
            return 0

        print(f"     Tarjetas encontradas: {len(cards)}")
        nuevos = 0

        for card in cards:
            if len(self.resultados) >= META_TOTAL:
                break

            datos = parse_card(card, ciudad)
            if datos is None:
                continue

            # Deduplicar por nombre + inicio de dirección
            clave = (
                f"{datos['Nombre'].lower()[:35]}|"
                f"{datos['Direccion'][:25].lower()}"
            )
            if clave in self.vistos:
                continue

            self.vistos.add(clave)
            self.resultados.append(datos)
            nuevos += 1

            print(
                f"     [{len(self.resultados):04d}] "
                f"{datos['Nombre'][:42]:<42} "
                f"{datos['Calificacion']}* "
                f"({datos['Num_Resenas']} res.)"
            )

        return nuevos

    def _guardar(self):
        campos = [
            "Ciudad", "Nombre", "Telefono", "Direccion",
            "Calificacion", "Num_Resenas", "Enlace_Actual", "Link_Google_Maps",
        ]
        with open(OUTPUT_CSV, "w", newline="", encoding="utf-8-sig") as f:
            writer = csv.DictWriter(f, fieldnames=campos)
            writer.writeheader()
            writer.writerows(self.resultados)
        print(f"\n  >> CSV guardado: {OUTPUT_CSV}")

    def run(self):
        print(f"\n{'='*65}")
        print("  SCRAPER PERFUMERIAS MEXICO | Scrapling + Playwright")
        print(f"  Meta: {META_TOTAL} prospectos | {datetime.now():%Y-%m-%d %H:%M}")
        print(f"{'='*65}\n")

        for ciudad in CIUDADES:
            if len(self.resultados) >= META_TOTAL:
                break

            c = ciudad_corta(ciudad)
            self.stats[c] = 0

            print(f"\n{'─'*60}")
            print(f"  CIUDAD: {ciudad.upper()} | Total: {len(self.resultados)}/{META_TOTAL}")
            print(f"{'─'*60}")

            for termino in TERMINOS:
                if len(self.resultados) >= META_TOTAL:
                    break

                url = build_url(termino, ciudad)
                print(f"\n  Busqueda: '{termino}' en {c}")
                print(f"  URL    : {url[:70]}...")

                antes = len(self.resultados)
                nuevos = self._fetch_busqueda(url, ciudad)
                self.stats[c] += nuevos

                print(f"  Nuevos : {nuevos} | Acumulado: {len(self.resultados)}")
                delay_humano()

        self._guardar()

        print(f"\n{'='*65}")
        print("  RESUMEN FINAL POR CIUDAD")
        print(f"{'─'*65}")
        for c, n in self.stats.items():
            bar = "#" * min(n // 5, 30)
            print(f"  {c:<25} {n:>5}  {bar}")
        print(f"{'─'*65}")
        print(f"  {'TOTAL':<25} {len(self.resultados):>5}")
        print(f"{'='*65}\n")
        print(f"  Archivo: {OUTPUT_CSV}")
        print(f"  Fin    : {datetime.now():%H:%M:%S}\n")


# ─────────────────────────────────────────────────────────────
if __name__ == "__main__":
    scraper = ScraperPerfumerias()
    scraper.run()
