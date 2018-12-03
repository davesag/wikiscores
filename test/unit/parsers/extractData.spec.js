const { expect } = require('chai')
const { stub } = require('sinon')
const proxyquire = require('proxyquire')

describe('src/parsers/extractData', () => {
  const cheerio = {
    load: stub(),
    filter: stub(),
    map: stub(),
    toArray: stub().returns([])
  }

  cheerio.load.returns(cheerio)
  cheerio.filter.returns(cheerio)
  cheerio.map.returns(cheerio)

  const functionName = stub()

  const testExtractor = stub()

  const extractors = { test: testExtractor }

  const $ = stub().returns(cheerio)

  const resetStubs = () => {
    cheerio.filter.resetHistory()
    cheerio.map.resetHistory()
    cheerio.toArray.resetHistory()
    functionName.resetHistory()
    testExtractor.resetHistory()
    $.resetHistory()
  }

  const functions = ['test']

  const extractData = proxyquire('src/parsers/extractData', {
    cheerio: cheerio,
    'src/extractors/functionName': functionName,
    'src/extractors': extractors
  })

  const html = 'some html'

  let extractor
  let result

  before(() => {
    functionName.returns('test')
    extractor = extractData(functions)
    result = extractor(html)
  })

  it('called cheerio.load with html', () => {
    expect(cheerio.load).to.have.been.calledWith(html)
  })
})
