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

  context('without a suffix', () => {
    before(() => {
      const extract = extractTableData(selector)
      extract($)
    })

    after(resetStubs)

    it('cheerio was called with the right selector', () => {
      expect($).to.have.been.calledOnceWith(`${selector} > td:last-child`)
    })
  })

  context('with a suffix', () => {
    const suffix = 'suffix'

    before(() => {
      const extract = extractTableData(selector, suffix)
      extract($)
    })

    after(resetStubs)

    it('cheerio was called with the right selector', () => {
      expect($).to.have.been.calledOnceWith(
        `${selector} > td:last-child > ${suffix}`
      )
    })
  })
})
