const { expect } = require('chai')

const convertTypes = require('src/parsers/convertTypes')

describe('src/parsers/convertTypes', () => {
  const TYPES = {
    length: ['8,000', 8000],
    articleId: [12345678, 12345678],
    edits: ['60', 60],
    recentEdits: ['20', 20],
    monthCount: ['6', 6],
    createdAt: ['02:31, 9 January 2015', '2015-01-09T02:31:00.000Z'],
    other: ['test', 'test']
  }

  const doTest = (field, [value, expected]) => {
    context(field, () => {
      it(`converts '${value}' to ${expected}`, () => {
        expect(convertTypes([{ [field]: value }])).to.deep.equal([
          { [field]: expected }
        ])
      })
    })
  }

  Object.keys(TYPES).forEach(key => {
    doTest(key, TYPES[key])
  })
})
