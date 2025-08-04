import { defineConfig } from 'vite';
import { fileURLToPath, URL } from 'node:url';

export default defineConfig({
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    fs: {
      cachedChecks: false   // ✅ forces Vite to re-check file paths instead of using stale cache
    }
  }
});
