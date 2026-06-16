"""
Scraper: Gimnasios, Pilates, Crossfit, Calistenia, Yoga — México
Meta   : 200 prospectos SIN sitio web profesional
Campos : Ciudad | Nombre | Teléfono | Link Google Maps
Fuente : Google Maps  |  Motor: Scrapling DynamicFetcher + Playwright
"""

import csv
import os
import random
import re
import sys
import time
from datetime import datetime
from urllib.parse import quote

if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")

from scrapling import DynamicFetcher

# ─────────────────────────────────────────────────────────────
# CONFIG
# ─────────────────────────────────────────────────────────────
OUTPUT = os.path.join(os.path.expanduser("~"), "Desktop", "200-fitness-mylder.csv")
META   = 200

CIUDADES = [
    "Ciudad de México",
    "Guadalajara Jalisco",
    "Monterrey Nuevo León",
    "Querétaro Querétaro",
    "Puebla Puebla",
]

TERMINOS = [
    "gimnasio",
    "gym",
    "pilates",
    "crossfit",
    "calistenia",
    "yoga",
    "fitness center",
    "entrenamiento funcional",
]

NO_PROF = {
    "facebook.com", "fb.com", "m.facebook.com",
    "instagram.com", "linktr.ee", "linktree.com",
    "twitter.com", "x.com", "tiktok.com",
    "youtube.com", "wa.me", "whatsapp.com",
    "google.com", "maps.app.goo.gl",
    "yelp.com", "tripadvisor.com",
    "wordpress.com", "blogspot.com",
    "wix.com", "weebly.com", "jimdo.com",
}

# ─────────────────────────────────────────────────────────────
# HELPERS
# ─────────────────────────────────────────────────────────────

def es_no_prof(url: str) -> bool:
    if not url or not url.strip():
        return True
    return any(d in url.lower() for d in NO_PROF)

def parse_rating(txt: str) -> float:
    txt = txt.strip().replace(",", ".")
    m = re.search(r"\d+\.\d+|\d+", txt)
    return float(m.group()) if m else 0.0

def parse_resenas(txt: str) -> int:
    clean = re.sub(r"[().,\s]", "", txt)
    m = re.search(r"\d+", clean)
    return int(m.group()) if m else 0

def ciudad_corta(c: str) -> str:
    return c.split()[0]

def build_url(termino: str, ciudad: str) -> str:
    return f"https://www.google.com/maps/search/{quote(termino + ' en ' + ciudad)}"

def delay():
    time.sleep(random.uniform(2.0, 3.0))

# ─────────────────────────────────────────────────────────────
# SCROLL
# ─────────────────────────────────────────────────────────────

def scroll_feed(page):
    js = """(() => {
        const f = document.querySelector('[role="feed"]');
        if (f) f.scrollBy(0, 2500); else window.scrollBy(0, 2500);
    })()"""
    for _ in range(10):
        try:
            page.evaluate(js)
        except Exception:
            pass
        time.sleep(1.3)

# ─────────────────────────────────────────────────────────────
# PARSEO DE TARJETA
# ─────────────────────────────────────────────────────────────

def parse_card(card, ciudad: str) -> dict | None:
    try:
        # Saltar anuncios
        if card.css(".kpih0e"):
            return None

        # Nombre
        nombre_els = card.css(".qBF1Pd")
        nombre = nombre_els[0].text.strip() if nombre_els else card.attrib.get("aria-label", "").strip()
        if not nombre:
            return None

        # Rating
        calificacion = 0.0
        mw = card.css(".MW4etd")
        if mw:
            calificacion = parse_rating(mw[0].text or "0")

        # Reseñas
        resenas = 0
        uy = card.css(".UY7F9")
        if uy:
            resenas = parse_resenas(uy[0].text or "0")

        # Filtros
        if calificacion < 4.0 or resenas < 20:
            return None

        # Teléfono
        telefono = ""
        tel = card.css(".UsdlK")
        if tel:
            telefono = tel[0].text.strip()
        if not telefono:
            for lnk in card.css("a[href]"):
                h = lnk.attrib.get("href", "")
                if h.startswith("tel:"):
                    telefono = h[4:].strip()
                    break

        # Web → descartar si tiene site profesional
        for lnk in card.css("a[href]"):
            h = lnk.attrib.get("href", "")
            if h.startswith("http") and "google.com" not in h and "goo.gl" not in h:
                if not es_no_prof(h):
                    return None   # tiene web propia → no es prospecto
                break

        # Link Google Maps
        maps_link = ""
        hfp = card.css("a.hfpxzc")
        if hfp:
            maps_link = re.sub(r"\?.*$", "", hfp[0].attrib.get("href", ""))
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
            "Link_Google_Maps": maps_link,
        }
    except Exception:
        return None

# ─────────────────────────────────────────────────────────────
# SCRAPER
# ─────────────────────────────────────────────────────────────

class ScraperFitness:
    def __init__(self):
        self.resultados: list[dict] = []
        self.vistos: set[str] = set()
        self.stats: dict[str, int] = {}

    def _fetch(self, url: str, ciudad: str) -> int:
        try:
            page = DynamicFetcher.fetch(
                url,
                headless=True,
                network_idle=False,
                timeout=40000,
                wait=3000,
                page_action=scroll_feed,
                disable_resources=True,
                google_search=True,
            )
        except Exception as e:
            print(f"     [!] Error: {e}")
            return 0

        cards = page.css(".Nv2PK")
        if not cards:
            print("     [!] Sin tarjetas")
            return 0

        print(f"     Tarjetas: {len(cards)}")
        nuevos = 0

        for card in cards:
            if len(self.resultados) >= META:
                break
            datos = parse_card(card, ciudad)
            if datos is None:
                continue
            clave = datos["Nombre"].lower()[:40]
            if clave in self.vistos:
                continue
            self.vistos.add(clave)
            self.resultados.append(datos)
            nuevos += 1
            print(f"     [{len(self.resultados):03d}] {datos['Nombre'][:50]:<50}  tel={datos['Telefono']}")

        return nuevos

    def _guardar(self):
        campos = ["Ciudad", "Nombre", "Telefono", "Link_Google_Maps"]
        with open(OUTPUT, "w", newline="", encoding="utf-8-sig") as f:
            csv.DictWriter(f, fieldnames=campos).writeheader()
            csv.DictWriter(f, fieldnames=campos).writerows(self.resultados)
        print(f"\n  CSV guardado: {OUTPUT}")

    def run(self):
        print(f"\n{'='*60}")
        print(f"  SCRAPER FITNESS MYLDER  |  Meta: {META}  |  {datetime.now():%H:%M}")
        print(f"{'='*60}\n")

        for ciudad in CIUDADES:
            if len(self.resultados) >= META:
                break

            c = ciudad_corta(ciudad)
            self.stats[c] = 0
            print(f"\n--- {ciudad.upper()} | Acumulado: {len(self.resultados)}/{META} ---\n")

            for termino in TERMINOS:
                if len(self.resultados) >= META:
                    break

                url = build_url(termino, ciudad)
                print(f"  >> '{termino}' en {c}  ({url[:65]}...)")

                n = self._fetch(url, ciudad)
                self.stats[c] += n
                print(f"     Nuevos: {n} | Total: {len(self.resultados)}\n")
                delay()

        self._guardar()

        print(f"\n{'='*60}  RESUMEN")
        for c, n in self.stats.items():
            print(f"  {c:<20} {n:>4} prospectos")
        print(f"  {'TOTAL':<20} {len(self.resultados):>4}")
        print(f"  Archivo: {OUTPUT}\n")


if __name__ == "__main__":
    ScraperFitness().run()
