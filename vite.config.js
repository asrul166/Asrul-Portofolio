import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import process from 'node:process'

// alamat situs untuk meta tag og:image dkk. di index.html.
// Di Vercel terisi otomatis dari domain produksi; bisa ditimpa dengan env SITE_URL.
const SITE_URL = (
  process.env.SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : '')
).replace(/\/$/, '')

const siteUrl = () => ({
  name: 'site-url',
  transformIndexHtml: (html) => html.replaceAll('%SITE_URL%', SITE_URL),
})

export default defineConfig({
  plugins: [react(), siteUrl()],
  server: {
    host: '0.0.0.0',
    port: 4173,
  },
  preview: {
    host: '0.0.0.0',
    port: 4173,
  },
})
