const run = require('./run')
const writeCSV = require('./utils/writeCSV')

run()
  .then(writeCSV('output.csv'))
  .catch(err => {
    console.error('error', err)
  })
