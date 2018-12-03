const run = require('src/run')
const writeCSV = require('src/writeCSV')

run()
  .then(writeCSV('output.csv'))
  .catch(err => {
    console.error('error', err)
  })
