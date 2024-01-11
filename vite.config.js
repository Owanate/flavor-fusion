import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        register: resolve(__dirname, "src/pages/register.html"),
        home: resolve(__dirname, "src/pages/dashboard.html"),
        explore: resolve(__dirname, "src/pages/explore.html"),
        cuisines: resolve(__dirname, "src/pages/cuisines.html"),
        search: resolve(__dirname, "src/pages/search.html"),
        instructions: resolve(__dirname, "src/pages/instructions.html"),
      },
    },
  },
  optimizeDeps: {
    include: ["jquery"],
  },
});
