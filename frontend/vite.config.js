import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    outDir: 'dist',
  },
  preview: {
    allowedHosts: ['all'],
    port: process.env.PORT || 3000,
    host: true,
  },
  server: {
    host: true,
    port: 5173,
  },
})
