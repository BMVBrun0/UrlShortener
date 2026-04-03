module.exports = {
  preset: "jest-expo",
  testMatch: ["**/tests/unit/**/*.test.(ts|tsx)"],
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  testPathIgnorePatterns: ["/node_modules/", "/android/", "/ios/"]
};
