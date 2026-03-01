import { defineConfig } from "vite";
import { resolve } from "node:path";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        index: resolve(__dirname, "index.html"),

        map: resolve(__dirname, "pages/map.html"),
        contact: resolve(__dirname, "pages/contact.html"),

        eagles: resolve(__dirname, "pages/animals/eagles.html"),
        gorilla: resolve(__dirname, "pages/animals/gorilla.html"),
        lemur: resolve(__dirname, "pages/animals/lemur.html"),
        panda: resolve(__dirname, "pages/animals/panda.html"),
      },
    },
  },
});
