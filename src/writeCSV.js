const CSVWriter = require('csv-writer')

const createCsvWriter = CSVWriter.createObjectCsvWriter

const writeCSV = (path = 'output.csv') => async records => {
  const header = Object.keys(records[0]).map(title => ({
    id: title,
    title: `${title.slice(0, 1).toUpperCase()}${title.slice(1)}`
  }))

  const csvWriter = createCsvWriter({ path, header })

  await csvWriter.writeRecords(records) // returns a promise

  console.log('Data written to', path)
}

module.exports = writeCSV
