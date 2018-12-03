const { expect } = require('chai')
const { stub } = require('sinon')

const functionName = require('src/extractors/functionName')

describe('src/extractors/functionName', () => {
  const name = 'test'
  const expected = 'extractTest'

  it('returns the expected function name', () => {
    expect(functionName(name)).to.equal(expected)
  })
})
