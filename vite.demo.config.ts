import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dirname = typeof __dirname !== 'undefined'
  ? __dirname
  : path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react()],
  root: path.resolve(dirname, 'demo'),
  base: '/liquid-glass-ui/',          // GitHub Pages base path
  resolve: {
    alias: {
      '@lib': path.resolve(dirname, 'src'),
    },
  },
  build: {
    outDir: path.resolve(dirname, 'docs'),
    emptyOutDir: true,
  },
});
