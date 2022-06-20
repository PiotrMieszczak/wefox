module.exports = {
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/setup-test.ts'],
  collectCoverage: true,
  coverageReporters: ['html'],
  coverageDirectory: 'coverage/wefox-post-manager',
  transformIgnorePatterns: ['/node_modules/?!@angular'],
};
