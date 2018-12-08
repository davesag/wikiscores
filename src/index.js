const run = require('./run')
const writeCSV = require('./writeCSV')

run()
  .then(writeCSV('output.csv'))
  .catch(err => {
    console.error('error', err)
  })
