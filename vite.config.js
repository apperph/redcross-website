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
      // We don't need to specify external modules here, but we will ensure 
      // module resolution is robust.
    },
    // Set a commonjs format fallback in case Vercel's node version requires it.
    commonjsOptions: {
      include: [/node_modules/],
      transformMixedEsModules: true,
    },
  },
});
