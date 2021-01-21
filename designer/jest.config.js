module.exports = {
  roots: ["<rootDir>/client"],
  testMatch: ["<rootDir>/**/__tests__/*.jest.(ts|tsx)"],
  testPathIgnorePatterns: ["<rootDir>/test/"],
  setupFilesAfterEnv: ["<rootDir>/jest-setup.js"],
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
  },
};
