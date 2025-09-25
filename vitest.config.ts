import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    environment: "node",
    coverage: {
      provider: "v8", // utilise V8 pour la couverture
      reporter: ["text", "html", "lcov"],
      reportsDirectory: "./coverage",
    },
  },
});
