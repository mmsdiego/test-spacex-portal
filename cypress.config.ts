import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    specPattern: "tests/e2e/**/*.cy.{js,ts,jsx,tsx}",
    supportFile: false,
    baseUrl: "http://localhost:3000",
    viewportWidth: 1280,
    viewportHeight: 720,
  },
});