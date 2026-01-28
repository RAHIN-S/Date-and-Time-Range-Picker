/// <reference types="vitest/config" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

import path from "node:path";
import { fileURLToPath } from "node:url";

const dirname =
  typeof __dirname !== "undefined"
    ? __dirname
    : path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react()],

  test: {
    projects: [
      // -------------------------------
      // ✅ Unit / Logic Tests (ONLY)
      // -------------------------------
      {
        test: {
          name: "unit",
          environment: "jsdom",
          globals: true,
          setupFiles: [
            path.resolve(dirname, "src/tests/setup.ts"),
          ],
          include: [
            "src/**/*.test.ts",
            "src/**/*.test.tsx",
          ],
        },
      },
    ],
  },
});
