module.exports = {
  preset: './jest-preset.js',
  clearMocks: true,
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
  },
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|react-native-svg)',
  ],
  transform: {
    '^.+\\.[jt]sx?$': 'babel-jest',
  },
  collectCoverageFrom: [
    '<rootDir>/src/components/**/*.{js,jsx}',
    '<rootDir>/src/screens/**/*.{js,jsx}',
    '<rootDir>/src/templates/**/*.{js,jsx}',
    '<rootDir>/src/common/contexts/**/*.{js,jsx}',
    '!<rootDir>/src/components/**/style.js',
    '!<rootDir>/src/screens/**/style.js',
    '!<rootDir>/src/templates/**/style.js',
  ],
};
