import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/Netchan",
  build: {
    rollupOptions: {
      input: {
        main: "index.html",
        fallback: "public/404.html", // Change this line to point to the 404.html file
      },
    },
  },
});
