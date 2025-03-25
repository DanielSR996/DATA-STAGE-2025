import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: ['8d53-177-241-248-42.ngrok-free.app'], // Agrega tu host aquí
    host: true, // Permite acceder desde cualquier IP
    port: 5173 // Asegúrate de usar el puerto correcto
  }
})

server: {  
  host: true  
}
