const extract = require('./extract')
const extractTerms = require('./extractTerms')
const extractCases = require('./extractCases')

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
  ['createdAt', 'pageinfo-firsttime', 'a'],
  ['creator', 'pageinfo-firstuser', 'a > bdi'],
  ['terms', extractTerms],
  ['cases', extractCases]
]

module.exports = extract(extractors, '#mw')
