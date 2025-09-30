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
      // Rollup import errors. This pattern ensures modular imports are handled correctly.
      external: [
        /^firebase\/.*/
      ]
    },
    // Set a commonjs format fallback in case Vercel's node version requires it.
    commonjsOptions: {
      include: [/node_modules/],
      transformMixedEsModules: true,
    },
  },
});
