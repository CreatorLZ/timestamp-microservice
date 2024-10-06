import { defineConfig } from "vite";
import react from "react";

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "..",
    emptyOutDir: false, // Be careful with this in the root directory
  },
  // If your API is on the same origin but different port in development
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true,
      },
    },
  },
});
