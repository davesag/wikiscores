const decc = require('decamelize')

const makeSelector = name => `pageinfo-${decc(name, { separator: '-' })}`

module.exports = makeSelector
