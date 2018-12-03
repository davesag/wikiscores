const { expect } = require('chai')

const convertTypes = require('src/parsers/convertTypes')

describe('src/parsers/convertTypes', () => {
  const TYPES = [
    ['length', '8,000', 8000],
    ['length', '', 0],
    ['length', null, 0],
    ['articleId', 12345678, 12345678],
    ['edits', '60', 60],
    ['recentEdits', '20', 20],
    ['monthCount', '6', 6],
    ['createdAt', null, ''],
    ['createdAt', 'unknown format', ''],
    ['createdAt', '01:02, 13 February 2015', '2015-02-13T01:02:00.000Z'],
    ['createdAt', '02:31, 9 January 2015', '2015-01-09T02:31:00.000Z'],
    ['other', 'test', 'test']
  ]

  const doTest = (field, value, expected) => {
    context(field, () => {
      it(`converts '${value}' to ${expected}`, () => {
        expect(convertTypes([{ [field]: value }])).to.deep.equal([
          { [field]: expected }
        ])
      })
    })
  }

  TYPES.forEach(args => {
    doTest(...args)
  })
})
