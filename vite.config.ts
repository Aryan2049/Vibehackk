import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Freebuff runs the dev server in a managed session. HMR must stay disabled,
// the server must bind 0.0.0.0, and the port is injected via PORT.
export default defineConfig(() => {
  const port = Number(process.env.PORT) || 5173;
  return {
    plugins: [react()],
    server: {
      host: "0.0.0.0",
      port,
      strictPort: false,
      hmr: false,
      allowedHosts: true as const,
    },
    preview: {
      host: "0.0.0.0",
      port,
      strictPort: false,
      allowedHosts: true as const,
    },
    build: {
      outDir: "dist",
      sourcemap: false,
    },
  };
});
