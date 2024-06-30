import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api": "https://keep-notes-321t.onrender.com",
    },
  },
  plugins: [react()],
});
