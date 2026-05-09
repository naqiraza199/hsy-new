import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { sitemapPlugin } from './vite-plugin-sitemap.js'

export default defineConfig({
  plugins: [vue(), sitemapPlugin()],
  server: {
    host: '0.0.0.0',
    port: 5174
  }
})
