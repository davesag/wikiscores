const decc = require('decamelize')

const makeSelector = name => `pageinfo-${decc(name, '-')}`

module.exports = makeSelector
