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
    host: "192.168.100.19",
    port: 3000,
  },
});
