import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    strictPort: true,
    proxy: {
      '/api': {
        target: 'http://localhost:5001',
        changeOrigin: true,
      },
    },
  },
  build: {
    rollupOptions: {
      output: {
        // Keep dependencies of lazy routes out of the initial application graph.
        onlyExplicitManualChunks: true,
        manualChunks: id => {
          if (!id.includes('/node_modules/')) return;
          if (/\/node_modules\/(react|react-dom|react-router|scheduler)\//.test(id)) return 'vendor-react';
          if (/\/node_modules\/(@firebase|firebase)\//.test(id)) return 'vendor-firebase';
          if (/\/node_modules\/(framer-motion|motion-dom|motion-utils)\//.test(id)) return 'vendor-motion';
          if (id.includes('/node_modules/lucide-react/')) return 'vendor-icons';
          if (id.includes('/node_modules/@hello-pangea/dnd/')) return 'vendor-dnd';
          if (id.includes('/node_modules/date-fns/')) return 'vendor-dates';
        },
      },
    },
    chunkSizeWarningLimit: 600,
  },
})
