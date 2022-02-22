module.exports = {
  globals: {
    "ts-jest": {
      tsconfig: "tsconfig.jest.json",
    },
  },
  testRegex: ".*.test.ts",
  moduleFileExtensions: ["ts", "js"],
  transform: {
    "\\.ts": "ts-jest",
  },
  testEnvironment: "node",
  reporters: ["default", "jest-junit", "jest-stare"],
  coverageDirectory: "./coverage",
  collectCoverage: true,
  setupFiles: ["./src/slack/test/setup-tests.ts"],
};
