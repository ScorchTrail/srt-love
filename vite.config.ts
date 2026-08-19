// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

// GitHub Pages serves a project site from /<repo>/, so assets need that prefix.
// BASE_PATH is set by .github/workflows/deploy.yml; local dev/build stays at "/".
const base = process.env["BASE_PATH"] ?? "/";

export default defineConfig({
  // GitHub Pages is static hosting only — no Node server, so skip the nitro server bundle.
  nitro: false,
  vite: {
    base,
    build: { outDir: "dist" },
  },
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    server: { entry: "server" },
    // Emit a prerendered static shell instead of requiring an SSR runtime.
    spa: { enabled: true },
    prerender: { enabled: true },
  },
});
