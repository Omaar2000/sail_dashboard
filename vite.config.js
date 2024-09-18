import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "https://sailgloble.com": {
        target: "https://sailgloble.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\https://sailgloble.com/, ""),
      },
    },
    overlay: "false",
  },
});
