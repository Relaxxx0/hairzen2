import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// allowedHosts: true lets hosted sandboxes (v0, Vercel, StackBlitz...) open the dev server.
export default defineConfig({
  plugins: [react()],
  server: { host: true, allowedHosts: true },
  preview: { host: true, allowedHosts: true },
});
