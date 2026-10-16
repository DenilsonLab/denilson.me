import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { fileURLToPath } from 'node:url';
export default defineConfig({
  plugins: [react()],
  resolve: { alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) } },
  build: {
    target: ['chrome111', 'edge111', 'firefox128', 'safari16.4'],
    outDir: 'dist',
    manifest: true,
  },
  server: { port: 3000, open: false },
});
