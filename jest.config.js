/*
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/en/configuration.html
 */

module.exports = {
  preset: 'ts-jest',
  testEnvironment: "node",
  testMatch: [
    "**/__tests__/**/*.[jt]s?(x)",
    "**/?(*.)+(spec|test).[tj]s?(x)"
  ],

  // An array of regexp pattern strings that are matched against all test paths, matched tests are skipped
  testPathIgnorePatterns: [
    "/node_modules/",
    "/dist/"
  ],
};
