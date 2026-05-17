import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsConfigPaths from "vite-tsconfig-paths";
import { tanstackStartVite } from "@tanstack/react-start/vite";
import vercel from "@tanstack/react-start/adapters/vercel";

export default defineConfig({
  plugins: [
    tanstackStartVite({
      adapter: vercel(),
    }),
    react(),
    tailwindcss(),
    tsConfigPaths(),
  ],
});