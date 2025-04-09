import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { visualizer } from 'rollup-plugin-visualizer'

export default defineConfig({
  base: '/project-template/',
  build: {
    outDir: 'dist',
  },
  plugins: [
    react(),
    tailwindcss(),
    visualizer({
      filename: 'bundle-report.html',
      open: true,
      gzipSize: true,
      brotliSize: true
    }),
  ],
});