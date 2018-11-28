const cc = require('camelcase')

const fnName = name => `extract${cc(name, { pascalCase: true })}`

module.exports = fnName
