import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (
              id.includes("@ant-design/plots") ||
              id.includes("@ant-design/charts")
            ) {
              return "charts";
            }
            if (
              id.includes("antd") ||
              id.includes("@ant-design/icons") ||
              id.includes("@ant-design/react-slick")
            ) {
              return "antd";
            }
            if (id.includes("framer-motion")) {
              return "framer-motion";
            }
            if (id.includes("lucide-react")) {
              return "lucide-react";
            }
            return "vendor";
          }
        },
      },
    },
    chunkSizeWarningLimit: 1500,
  },
});
