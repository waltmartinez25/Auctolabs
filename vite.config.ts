import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { vitePrerenderPlugin } from "vite-prerender-plugin";
import { ViteImageOptimizer } from "vite-plugin-image-optimizer";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
    mode === "production" &&
      vitePrerenderPlugin({
        prerenderScript: path.resolve(__dirname, "./src/prerender.tsx"),
        renderTarget: "#root",
        additionalPrerenderRoutes: [
          "/services",
          "/industries",
          "/process",
          "/pricing",
          "/about",
          "/contact",
          "/blog",
          "/privacy",
          "/terms",
        ],
      }),
    mode === "production" &&
      ViteImageOptimizer({
        jpg: { quality: 80 },
        png: { quality: 80 },
      }),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom", "react-router-dom"],
          motion: ["framer-motion"],
          supabase: ["@supabase/supabase-js"],
          query: ["@tanstack/react-query"],
        },
      },
    },
  },
  optimizeDeps: {
    include: ["framer-motion"],
  },
}));
