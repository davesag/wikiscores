const normaliseFileName = filename =>
  filename.endsWith('.csv') ? filename : `${filename}.csv`

module.exports = normaliseFileName
