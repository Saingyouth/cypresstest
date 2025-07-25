const { defineConfig } = require("cypress");
const localEnv = require('./config/local.json');
const ciEnv = require('./config/ci.json');

const environment = process.env?.environment;
const isLocal = environment === 'local' || environment == undefined;


module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    env: isLocal ? localEnv : ciEnv,
  },
});
