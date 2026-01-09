import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/workbench/',
  plugins: [react()],
  root: '.',
  server: {
    host: '0.0.0.0',
    port: 8000
  },
  preview: {
    host: '0.0.0.0',
    port: 8000
  },
  build: {
    outDir: 'docs'
  }
})