const extract = require('src/extractors/extract')
const extractTerms = require('src/extractors/extractTerms')
const extractCases = require('src/extractors/extractCases')

const extractors = [
  ['title', 'pageinfo-display-title'],
  ['defaultSort'],
  ['length'],
  ['articleId'],
  ['contentModel'],
  ['watchers'],
  ['edits'],
  ['recentEdits'],
  ['monthCount', 'pvi-month-count'],
  ['createdAt', 'pageinfo-firsttime'],
  ['creator', 'pageinfo-firstuser', 'a > bdi'],
  ['terms', extractTerms],
  ['cases', extractCases]
]

module.exports = extract(extractors, '#mw')
