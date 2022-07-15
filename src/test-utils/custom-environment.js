// custom-environment
const SetupPollyJestEnvironment = require('setup-polly-jest/jest-environment-jsdom');

class CustomEnvironment extends SetupPollyJestEnvironment {
  constructor(config, context) {
    super(config, context);

    // Setting up testPath global for auto-setup-polly.ts
    // Followed https://stackoverflow.com/questions/62995762/how-do-you-find-the-filename-and-path-of-a-running-test-in-jest
    this.global.testPath = context.testPath;
  }
}

module.exports = CustomEnvironment;