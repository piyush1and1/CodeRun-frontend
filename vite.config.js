import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Proxy all requests starting with /api to your backend server
      '/api': {
        target: process.env.VITE_API_URL, // Your backend URL
        changeOrigin: true,
        secure: false,
      },
    },
  },
})