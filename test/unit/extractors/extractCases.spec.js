const { expect } = require('chai')
const { stub } = require('sinon')

const extractCases = require('src/extractors/extractCases')

describe('src/extractors/extractCases', () => {
  const cheerio = {
    filter: stub(),
    map: stub(),
    toArray: stub().returns([])
  }

  cheerio.filter.returns(cheerio)
  cheerio.map.returns(cheerio)

  const $ = stub().returns(cheerio)

  const resetStubs = () => {
    cheerio.filter.resetHistory()
    cheerio.map.resetHistory()
    cheerio.toArray.resetHistory()
    $.resetHistory()
  }

  before(() => {
    extractCases($)
  })

  it('cheerio was called with the right selector', () => {
    expect($).to.have.been.calledWith('td > small > i > a')
  })
})
