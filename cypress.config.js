const { defineConfig } = require("cypress");

module.exports = defineConfig({
  // Ref. https://docs.cypress.io/api/cypress-api/env
  env: {
    service: "Nwitter"
  },
  // Ref. https://docs.cypress.io/guides/references/configuration#Testing-Type-Specific-Options
  e2e: {
    baseUrl: "http://localhost:3000"
  }
});
