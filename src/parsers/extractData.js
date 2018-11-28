const cheerio = require('cheerio')
const functionName = require('src/extractors/functionName')

const extractors = require('src/extractors')

const extractData = functions => html => {
  const $ = cheerio.load(html)
  return functions.reduce((acc, elem) => {
    const fnName = functionName(elem)
    const fn = extractors[fnName]
    if (typeof fn === 'function') acc[elem] = fn($)
    return acc
  }, {})
}

module.exports = extractData
