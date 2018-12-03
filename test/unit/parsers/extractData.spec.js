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

  const functions = ['test']

  const extractData = proxyquire('src/parsers/extractData', {
    cheerio: cheerio,
    'src/extractors/functionName': functionName,
    'src/extractors': extractors
  })

  const html = 'some html'

  before(() => {
    functionName.returns('test')
    const extractor = extractData(functions)
    extractor(html)
  })

  it('called cheerio.load with html', () => {
    expect(cheerio.load).to.have.been.calledWith(html)
  })
})
