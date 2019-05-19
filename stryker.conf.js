module.exports = function(config) {
  config.set({
    mutate: [
      'src/**/*.js',
      '!src/run.js',
      '!src/index.js',
      '!src/constants.js'
    ],
    mutator: 'javascript',
    packageManager: 'npm',
    reporters: ['clear-text'],
    testRunner: 'mocha',
    mochaOptions: {
      spec: ['./test/unit/**/*.test.js'],
      require: ['./test/unitTestHelper.js']
    },
    transpilers: [],
    testFramework: 'mocha',
    coverageAnalysis: 'perTest',
    thresholds: { high: 80, low: 70, break: null }
  })
}
