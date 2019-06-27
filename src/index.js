const run = require('./run')
const writeCSV = require('./utils/writeCSV')

run()
  .then(({ processed, skipped }) => {
    writeCSV('output.csv')(processed)
    if (skipped.length) writeCSV('skipped.csv')(skipped)
  })
  .catch(err => {
    console.error('error', err)
  })
