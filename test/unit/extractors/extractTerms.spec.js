const { expect } = require('chai')
const { stub } = require('sinon')

const extractTerms = require('src/extractors/extractTerms')

describe('src/extractors/extractTerms', () => {
  const fakeCheerio = {
    filter: stub(),
    map: stub(),
    toArray: stub().returns([])
  }

  fakeCheerio.filter.returns(fakeCheerio)
  fakeCheerio.map.returns(fakeCheerio)

  const $ = stub().returns(fakeCheerio)

  const resetStubs = () => {
    fakeCheerio.filter.resetHistory()
    fakeCheerio.map.resetHistory()
    fakeCheerio.toArray.resetHistory()
    $.resetHistory()
  }

  before(() => {
    extractTerms($)
  })

  it('cheerio was called with the right selector', () => {
    expect($).to.have.been.calledWith('li > a')
  })
})
