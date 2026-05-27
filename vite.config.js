import { defineConfig } from 'vite';
import preact from '@preact/preset-vite';
import { resolve } from 'path';

export default defineConfig({
  plugins: [preact()],
  build: {
    lib: {
      entry: resolve(__dirname, 'template/src/index.js'),
      name: 'DevDocs',
      fileName: () => 'components.js',
      formats: ['iife']
    },
    outDir: resolve(__dirname, 'template'),
    emptyOutDir: false,
    rollupOptions: {
      // We bundle everything (including preact) so the output is 100% self-contained
    }
  },
  define: {
    // Set process.env.NODE_ENV to production for Preact builds
    'process.env.NODE_ENV': JSON.stringify('production')
  }
});
