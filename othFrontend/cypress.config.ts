import { defineConfig } from "cypress";
import { loadEnv } from "vite";

const viteEnv = loadEnv("development", process.cwd(), "VITE_");

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:5173",
    env: {
      auth0ClientId: viteEnv.VITE_AUTH_CLIENT_ID,
      auth0Domain: viteEnv.VITE_AUTH_DOMAIN,
    },
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
