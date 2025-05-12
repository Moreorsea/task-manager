import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig({
  plugins: [
    vue(),
    viteStaticCopy({
      targets: [
        {
          src: 'src/locales/**/*',
          dest: 'locales'
        }
      ]
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  base: './',
  server: {
    port: 3000,
    // open: true,
    proxy: {
      '/locales': {
        target: 'http://localhost:3000',
        rewrite: (path) => path.replace(/^\/locales/, '/src/locales')
      }
    }
  }
})