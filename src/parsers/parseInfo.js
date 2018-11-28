const extractData = require('src/parsers/extractData')

module.exports = extractData([
  'title',
  'defaultSort',
  'length',
  'articleId',
  'contentModel',
  'watchers',
  'edits',
  'recentEdits',
  'monthCount',
  'createdAt',
  'creator'
])
