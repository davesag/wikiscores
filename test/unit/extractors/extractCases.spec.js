const { expect } = require('chai')
const { stub } = require('sinon')

const extractCases = require('src/extractors/extractCases')

describe('src/extractors/extractCases', () => {
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
    extractCases($)
  })

  it('cheerio was called with the right selector', () => {
    expect($).to.have.been.calledWith('td > small > i > a')
  })
})
