const { expect } = require('chai')
const { stub } = require('sinon')

const extractTableData = require('src/extractors/extractTableData')

describe('src/extractors/extractTableData', () => {
  const fakeCheerio = {
    text: stub().returns('test')
  }

  const $ = stub().returns(fakeCheerio)

  const resetStubs = () => {
    fakeCheerio.text.resetHistory()
    $.resetHistory()
  }

  const selector = 'selector'
  let result

  context('without a suffix', () => {
    before(() => {
      const extract = extractTableData(selector)
      result = extract($)
    })

    it('cheerio was called with the right selector', () => {
      expect($).to.have.been.calledWith(`${selector} > td:last-child`)
    })
  })

  context('with a suffix', () => {
    const suffix = 'suffix'

    before(() => {
      const extract = extractTableData(selector, suffix)
      result = extract($)
    })

    it('cheerio was called with the right selector', () => {
      expect($).to.have.been.calledWith(
        `${selector} > td:last-child > ${suffix}`
      )
    })
  })
})
