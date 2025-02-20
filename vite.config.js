import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [tailwindcss(), , react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      "/api": "https://web-production-bcc7.up.railway.app",
    },
  },
  // server: {
  //   host: "192.168.100.19",
  //   port: 3000,
  // },
});
