import { fileURLToPath, URL } from 'url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'
 import VitePluginCdn from 'vite-plugin-cdn';
 

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    
    VitePWA({
      strategies: 'generateSW',
      includeAssets: ['favicon.ico', 'android-chrome-192x192.png', 'apple-touch-icon.png'], 
      registerType: 'autoUpdate',
      manifest: {
        name: "Calculator",
        short_name: "Calc",
        theme_color: "#7a00ff",
        start_url: "/",
        display: "standalone",
        background_color: "#121212",
        description: "An awesome scientific calculator with awesome UI.",
        orientation: "portrait-primary",
        icons: [
         {
    src: "public/favicon-16x16.png",
    sizes: "16x16",
    type: "image/png"
  }, {
    src: "public/favicon-32x32.png",
    sizes: "32x32",
    type: "image/png"
  }, {
    src: "public/favicon.ico",
    sizes: "48x48",
    type: "image/png"
  }, {
    src: "public/android-chrome-192x192.png",
    sizes: "192x192",
    type: "image/png"
  }, {
    src: "public/apple-touch-icon.png",
    sizes: "256x256",
    type: "image/png"
  }, 
        {
    src: "public/android-chrome-512x512.png",
    sizes: "512x512",
    type: "image/png"
  }
        ],
      }
    }) 
 
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
