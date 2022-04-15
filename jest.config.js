module.exports = {
  preset: 'react-native',
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: 'coverage',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests'],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
  moduleDirectories: ['src', 'node_modules'],
  moduleNameMapper: {
    '\\.(jpg|ico|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/src/test-utils/mockStub.js',
    '\\.(css|less|scss|sass)$': '<rootDir>/src/test-utils/mockStub.js',
  },
};
