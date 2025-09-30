import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // This configuration block explicitly tells the Rollup bundler (used by Vite) 
  // how to handle modules, often solving issues with libraries like Firebase 
  // that have complex nested module structures.
  build: {
    rollupOptions: {
      // FIX: Explicitly mark Firebase modular packages as external to resolve 
      // Rollup import errors. We are using an array of module IDs for better 
      // compatibility with some Vercel/Vite setups.
      external: [
        'firebase/app',
        'firebase/auth',
        'firebase/firestore',
        /^firebase\/.*/ // Keep the regex as a fallback
      ]
    },
    // Set a commonjs format fallback in case Vercel's node version requires it.
    commonjsOptions: {
      include: [/node_modules/],
      transformMixedEsModules: true,
    },
  },
});
