import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { fileURLToPath, URL } from 'node:url';
import { VitePWA } from 'vite-plugin-pwa';
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig({
  plugins: [
    vue(),
    viteStaticCopy({
      targets: [
        {
          src: 'src/locales/**/*',
          dest: 'locales',
        },
      ],
    }),
    VitePWA({
      strategies: 'injectManifest',
      srcDir: '/',
      filename: 'sw.js',
      registerType: 'autoUpdate',
      manifest: false,
      workbox: {
        sourcemap: true
      }
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  base: './',
  server: {
    port: 3000,
    proxy: {
      '/locales': {
        target: 'http://localhost:3000',
        rewrite: (path) => path.replace(/^\/locales/, '/src/locales'),
      },
    },
  },
});
