const { expect } = require('chai')

const makeSelector = require('src/extractors/makeSelector')

describe('src/extractors/makeSelector', () => {
  const name = 'TestName'
  const expected = 'pageinfo-test-name'

  it('returns the expected function name', () => {
    expect(makeSelector(name)).to.equal(expected)
  })
})
