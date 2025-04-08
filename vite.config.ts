import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// Determine if we're in production mode
const isProduction = process.env.NODE_ENV === 'production';

export default defineConfig({
  plugins: [
    react()
  ],
  build: {
    cssCodeSplit: true,
    minify: 'terser',
    outDir: 'dist',
    assetsDir: 'assets',
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  server: {
    open: false,
    hmr: true,
  },
}); 