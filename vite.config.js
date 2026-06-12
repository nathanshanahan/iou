import { defineConfig } from 'vite';

export default defineConfig({
  resolve: {
    alias: {
      '@': '/frontend',
      '~': '/frontend'
    }
  },
  server: {
    host: 'localhost',
    port: 5173,
    https: false
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler'
      }
    }
  },
  build: {
    outDir: 'assets',
    emptyOutDir: false, // CRITICAL: Don't delete existing assets (Liquid files live here too)
    manifest: false,
    rollupOptions: {
      input: {
        theme: './frontend/entrypoints/theme.js'
      },
      output: {
        entryFileNames: 'vite-theme.js',
        chunkFileNames: 'vite-chunk-[name].js',
        assetFileNames: 'vite-theme.css'
      }
    }
  }
});
