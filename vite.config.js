import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/',
  plugins: [react()],
  server: {
    historyApiFallback: true
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react')) {
              return 'vendor_react';
            }
            if (id.includes('firebase/auth')) {
              return 'firebase_auth';
            }
            if (id.includes('firebase/firestore')) {
              return 'firebase_firestore';
            }
            if (id.includes('firebase/storage')) {
              return 'firebase_storage';
            }
            if (id.includes('firebase')) {
              return 'vendor_firebase';
            }
            return 'vendor';
          }
        }
      }
    }
  }
});
