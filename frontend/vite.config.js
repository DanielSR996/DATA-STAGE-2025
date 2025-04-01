import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: ['8d53-177-241-248-42.ngrok-free.app'], // Agrega tu host aquí
    host: true, // Permite acceder desde cualquier IP
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false
      }
    }
  }
})

server: {  
  host: true  
}
