import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
<<<<<<< HEAD
        target: "https://92.205.230.83:8080",
=======
        target: "https://dev.sailgloble.com",
>>>>>>> main
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
