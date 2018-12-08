const { expect } = require('chai')
const { stub } = require('sinon')
const proxyquire = require('proxyquire')

describe('src/fetchers/fetchPageInfo', () => {
  const fetch = stub()

  const fetchPageInfo = proxyquire('src/fetchers/fetchPageInfo', {
    './fetch': fetch
  })

  const base = 'https://en.wikipedia.org/w/index.php?action=info&title='
  const title = 'some title'
  const expected = `${base}${title}`
  const result = 'some result'

  let res

  before(async () => {
    fetch.resolves(result)
    res = await fetchPageInfo(title)
  })

  it('called fetch with the right url', () => {
    expect(fetch).to.have.been.calledOnceWith(expected)
  })

  it('returned the expected result', () => {
    expect(res).to.equal(result)
  })
})
