import { defineConfig } from "vite";
import liveReload from "vite-plugin-live-reload";
import mkcert from "vite-plugin-mkcert";

export default defineConfig({
  server: {
    port: 5175,
    cors: true,
    https: true,
  },
  build: {
    manifest: true,
    emptyOutDir: true,
    outDir: "dist",
    rollupOptions: {
      input: "./src/js/main.js",
    },
  },
  plugins: [mkcert(), liveReload(["**/*.php"])],
});
