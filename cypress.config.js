const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://agendamento.quarkclinic.com.br/index/363622206",
    setupNodeEvents(on, config) {},
    viewportWidth: 1280,
    viewportHeight: 720,
  },
});
