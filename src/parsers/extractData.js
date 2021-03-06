const cheerio = require('cheerio')
const functionName = require('../extractors/functionName')

const extractors = require('../extractors')

const extractData = functions => html => {
  const $ = cheerio.load(html)
  return functions.reduce((acc, elem) => {
    const fnName = functionName(elem)
    const fn = extractors[fnName]
    /* istanbul ignore else */ if (typeof fn === 'function') acc[elem] = fn($)
    return acc
  }, {})
}

module.exports = extractData
