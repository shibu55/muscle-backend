module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testPathIgnorePatterns: ['/node_modules/', '/dist/', '/fixtures/'],
  moduleFileExtensions: ['ts', 'js', 'json', 'node'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest'
  },
  setupFiles: ['dotenv/config'],
  globalSetup: '<rootDir>/__tests__/fixtures/globalSetup.ts',
  globalTeardown: '<rootDir>/__tests__/fixtures/globalTeardown.ts',
  maxWorkers: 1,
  testTimeout: 3000,
};
