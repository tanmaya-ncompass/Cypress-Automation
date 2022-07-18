const { defineConfig } = require("cypress");
const cucumber = require('cypress-cucumber-preprocessor').default

module.exports = defineConfig({
  projectId: "xtt5hq",
  defaultCommandTimeout : 10000,
  reporter:"mochawesome",
  retries:{
    runMode:2
  },
  env: {
    //url: 'https://rahulshettyacademy.com'
    url: 'https://wsc.phonexcorp.com/'
  },
  e2e: {
    setupNodeEvents(on, config) {
      on('file:preprocessor',cucumber())
      // implement node event listeners here
    },
    //specPattern:'cypress/integration/*/*'
    specPattern:'cypress/integration/examples/BDD/*.feature'
  },
});
