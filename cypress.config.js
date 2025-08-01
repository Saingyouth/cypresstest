const fs = require('fs');
const { defineConfig } = require("cypress");

const environment = process.env?.environment;
const isLocal = environment === 'local' || environment == undefined;

const readConfigFile = (fileName) => {
  if (fs.existsSync(fileName)) {
    return JSON.parse(fs.readFileSync(fileName, 'utf8'));
  } else {
    return {};
  }
}
const cypressEnv = readConfigFile(isLocal ? 'config/local.json' : 'config/ci.json');
console.log('env', cypressEnv);

const users = cypressEnv?.users;
const extractedUsers = [];

users?.forEach((user) => {
  Object.keys(user).forEach((key) => {
    extractedUsers[key] = user[key];
  })
});

module.exports = defineConfig({
  
  e2e: {
    setupNodeEvents(on, config) {
      on('task', {
        log(message) {
          console.log(message); // Log to the console
          // Log to a file (assuming 'logs' directory exists)
          require('fs').appendFileSync('config/cypress.log', `${message}\n`);
          return null; // Return null to indicate task completion
        }
      });
    },
    env: { ...cypressEnv, ...extractedUsers }
  },
});
