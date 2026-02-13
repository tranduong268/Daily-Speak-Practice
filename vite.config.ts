import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load các biến môi trường (như API_KEY từ Vercel)
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react()],
    // Định nghĩa biến toàn cục process.env.API_KEY để code hiện tại hoạt động bình thường
    define: {
      'process.env.API_KEY': JSON.stringify(env.API_KEY)
    },
    build: {
      outDir: 'dist',
    }
  };
});