import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
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
        manualChunks: {
          'vendor-react': ['react', 'react-dom', 'react-router'],
          'vendor-firebase': ['firebase/app', 'firebase/auth'],
          'vendor-ui': ['lucide-react', 'framer-motion'],
          'vendor-dnd': ['@hello-pangea/dnd'],
          'vendor-utils': ['date-fns', 'axios', 'socket.io-client', 'zustand'],
        },
      },
    },
    chunkSizeWarningLimit: 600,
  },
})
