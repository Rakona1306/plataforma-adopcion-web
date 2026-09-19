import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import { fileURLToPath, URL } from "node:url";
import path from "node:path";

export default defineConfig({
  plugins: [react()],

  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      "next/font/google": path.resolve(
        __dirname,
        "./src/__mocks__/utils/next-font-google.ts",
      ),
    },
  },

  test: {
    environment: "jsdom",

    globals: true,

    setupFiles: ["./src/test/setup.tsx"],

    include: ["src/**/*.{test,spec}.{ts,tsx}"],
  },
});
