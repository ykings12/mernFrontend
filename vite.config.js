import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 3000, 
    proxy: {
      "/api/": "https://mernbackend-3-k4d3.onrender.com",
      "/uploads/": "https://mernbackend-3-k4d3.onrender.com",
    },
  },
});
