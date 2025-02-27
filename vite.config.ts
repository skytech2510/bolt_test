import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  server: {
    port: 5173, // Default Vite port
    host: true, // Listen on all local IPs
    hmr: {
      overlay: true
    }
  }
});