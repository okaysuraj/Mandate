export default {
  testEnvironment: "node",
  transform: {},
  setupFilesAfterEnv: ["<rootDir>/src/tests/setup.js"],
  testMatch: ["**/**/*.test.js"],
  verbose: true,
  forceExit: true,
  clearMocks: true
};
