import { defineConfig } from 'vite';

export default defineConfig({
  base: '/template/', // Use your GitHub repository name here
  build: {
    outDir: 'dist', // Optional: Ensure output goes to the 'dist' folder
  },
});