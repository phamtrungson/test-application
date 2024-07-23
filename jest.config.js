module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    coverageDirectory: '.coverage',
    verbose: true,
    moduleNameMapper: {
        "@interfaces(.*)$": '<rootDir>/src/interfaces$1',
        "@core(.*)$": '<rootDir>/src/interfaces$1',
        "@domain(.*)$": '<rootDir>/src/domain$1',
        "@infra(.*)$": '<rootDir>/src/infrastructure$1',
        "@application(.*)$": '<rootDir>/src/main-application$1',
    },
    // eslint-disable-next-line prettier/prettier
    collectCoverageFrom: [
        '**/*.ts',
        './src/**/*.ts',
        '!**/node_modules/**'
    ],
    testTimeout: 10000
};
