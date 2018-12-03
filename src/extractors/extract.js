const makeSelector = require('src/extractors/makeSelector')
const functionName = require('src/extractors/functionName')
const extractTableData = require('src/extractors/extractTableData')

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
