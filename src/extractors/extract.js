const makeSelector = require('./makeSelector')
const functionName = require('./functionName')
const extractTableData = require('./extractTableData')

const extract = (extractors, base) =>
  extractors.reduce((acc, [name, sel, suffix]) => {
    const selector = sel
      ? typeof sel === 'string'
        ? sel
        : undefined
      : makeSelector(name)

    acc[functionName(name)] =
      typeof sel === 'function'
        ? sel
        : base
        ? extractTableData(`${base}-${selector}`, suffix)
        : extractTableData(selector, suffix)

    return acc
  }, {})

module.exports = extract
