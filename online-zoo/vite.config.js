import { defineConfig } from "vite";
import { resolve } from "node:path";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        index: resolve(__dirname, "index.html"),
        map: resolve(__dirname, "pages/map.html"),
        animals: resolve(__dirname, "pages/animals.html"),
        contact: resolve(__dirname, "pages/contact.html"),
        signIn: resolve(__dirname, "pages/sign-in.html"),
        register: resolve(__dirname, "pages/register.html"),
      },
    },
  },
});
