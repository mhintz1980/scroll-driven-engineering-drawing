import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  base: '/Mark_Hintz-Portfolio-v2/',
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    allowedHosts: true,
  },
})
