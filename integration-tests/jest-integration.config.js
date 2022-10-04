// This is merged with default config as per https://github.com/just-jeb/angular-builders/tree/master/packages/jest#builder-options

// Test environment copied from: https://netflix.github.io/pollyjs/#/test-frameworks/jest-jasmine?id=supported-test-runners
module.exports = {
  testEnvironment: "<rootDir>/integration-tests/jest-integration.environment.js",
  testMatch: ["<rootDir>/integration-tests/__tests__/**/*.spec.ts"],
  setupFilesAfterEnv: [
    "<rootDir>/integration-tests/jest/setupFilesAfterEnv/pollyContext.ts",
  ]
};
