module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    coverageDirectory: '.coverage',
    verbose: true,
    moduleNameMapper: {
        "@building-blocks(.*)$": '<rootDir>/src/building-blocks$1',
        "@interfaces(.*)$": '<rootDir>/src/interfaces$1',
        "@core(.*)$": '<rootDir>/src/interfaces$1'
    },
    // eslint-disable-next-line prettier/prettier
    collectCoverageFrom: [
        '**/*.ts',
        './src/**/*.ts',
        '!**/node_modules/**'
    ],
    testTimeout: 10000
};
