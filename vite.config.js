import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: ["sureshs-macbook-pro.local", "e115-2401-4900-1c02-4cea-5d0e-58b6-9391-1c30.ngrok-free.app"]
  }
})
