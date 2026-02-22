import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    vue(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'mask-icon.svg'],
      manifest: {
        name: 'Mirage Access System',
        short_name: 'Mirage',
        description: 'Sistema de control de accesos - Batán 3',
        theme_color: '#0f172a', // Color pizarra oscuro (Slate-950)
        background_color: '#0f172a',
        display: 'standalone', // Esto quita la barra del navegador
        icons: [
          {
            src: 'pwa-256x256.png',
            sizes: '256X256',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      }
    })
  ],
  server: {
    host: true // Para que sigas viéndolo en el celular
  }
})
