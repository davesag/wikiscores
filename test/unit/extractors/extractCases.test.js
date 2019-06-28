const { expect } = require('chai')
const { stub } = require('sinon')

const extractCases = require('src/extractors/extractCases')
const { reset, write } = require('src/utils/cache')

describe('src/extractors/extractCases', () => {
  const results = [{ name: 'test' }]

  const cheerio = {
    filter: stub(),
    map: stub(),
    toArray: stub().returns(results)
  }

  cheerio.filter.returns(cheerio)
  cheerio.map.returns(cheerio)

  const $ = stub().returns(cheerio)

  const resetStubs = () => {
    reset()
    $.resetHistory()
  }

  let result

  context('when there is a filter', () => {
    before(() => {
      reset()
      write('filter', new RegExp('not-test', 'i'))
      result = extractCases($)
    })

    after(resetStubs)

    it('cheerio was called with the right selector', () => {
      expect($).to.have.been.calledWith('td > small > i > a')
    })

    it('returned the filtered result', () => {
      expect(result).to.deep.equal([])
    })
  })

  context('when there is no filter', () => {
    before(() => {
      result = extractCases($)
    })

    after(resetStubs)

    it('cheerio was called with the right selector', () => {
      expect($).to.have.been.calledWith('td > small > i > a')
    })

    it('returned the filtered result', () => {
      expect(result).to.deep.equal(results)
    })
  })
})
