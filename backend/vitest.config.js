import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    environment: "node",
    setupFiles: ["./tests/setup.js"],
    include: ["tests/**/*.test.js"],
    coverage: {
      provider: "v8",
      include: ["src/**/*.js"],
      exclude: [
        "src/server.js",
        "src/libs/**",
        "src/config/**",
        "src/workers/**",
        "src/queues/**",
        "src/scripts/**",
      ],
    },
  },
});
