import nextJest from 'next/jest.js';

const createJestConfig = nextJest({
  dir: './',
});

const customJestConfig = {
  setupFilesAfterEnv: ['./jest-setup.ts'],
  moduleNameMapper: {
    // Mock CSS/SCSS files
    '\\.(css|scss)$': 'identity-obj-proxy',
    // Mock static file imports
    '\\.(png|jpg|jpeg|gif|webp|svg|ico)$': '<rootDir>/__mocks__/fileMock.js',
    '^@repo/ui/(.*)$': '<rootDir>/packages/ui/src/$1',
  },

  testEnvironment: 'jsdom',
};

module.exports = createJestConfig(customJestConfig);
