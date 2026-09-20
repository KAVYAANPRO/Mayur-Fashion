import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        navigateFallbackDenylist: [/^\/admin/],
      },
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'mayur-icon.png'],
      manifest: {
        name: 'Mayur Fashion',
        short_name: 'Mayur',
        description: 'Mayur Fashion - Premium Ethnic Wear',
        theme_color: '#db2777',
        background_color: '#ffffff',
        display: 'standalone',
        icons: [
          {
            src: 'mayur-icon.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'mayur-icon.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      }
    })
  ],
  server: {
    port: 3000,
    host: true,
  },
});
