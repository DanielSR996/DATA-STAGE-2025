import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://8d53-177-241-248-42.ngrok-free.app',
        changeOrigin: true,
        secure: false
      }
    }
  }
})

server: {  
  host: true  
}
