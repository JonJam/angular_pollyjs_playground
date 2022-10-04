// This is merged with default config as per https://github.com/just-jeb/angular-builders/tree/master/packages/jest#builder-options

// Test environment copied from: https://netflix.github.io/pollyjs/#/test-frameworks/jest-jasmine?id=supported-test-runners
module.exports = {
  testEnvironment: "<rootDir>/integration-tests/jest-integration.environment.js",
  // testEnvironmentOptions: {
  //   // Wierdly the jsdom environment is using "https://github.com/just-jeb/angular-builders"
  //   // for location.href as per https://archive.jestjs.io/docs/en/24.x/configuration#testurl-string.
  //   //
  //   // This caused:
  //   // - Relative API requests in Angular e.g. /api/user/getMe1/ to call out to Github !!!!
  //   // - When used an absolute URL, HTTP requests failed with CORS errors.
  //   //
  //   // Overriding fixes the previous issues.
  //   //
  //   // See https://jestjs.io/docs/configuration#testenvironmentoptions-object
  //   url: "https://localhost",
  // },
  testMatch: ["<rootDir>/integration-tests/__tests__/**/*.spec.ts"],
  setupFilesAfterEnv: [
    "<rootDir>/integration-tests/jest/setupFilesAfterEnv/pollyContext.ts",
  ]
};
