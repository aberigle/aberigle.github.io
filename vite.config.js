import { defineConfig } from "vite";
import { resolve } from 'path'
import pugPlugin from "vite-plugin-pug";

export default defineConfig({
  plugins: [pugPlugin({ pretty: true })],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        nested: resolve(__dirname, 'notion/index.html'),
      },
    }
  }

})