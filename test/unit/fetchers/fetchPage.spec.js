const { expect } = require('chai')
const { stub } = require('sinon')
const proxyquire = require('proxyquire')

describe('src/fetchers/fetchPage', () => {
  const fetch = stub()

  const fetchPage = proxyquire('src/fetchers/fetchPage', {
    './fetch': fetch
  })

  const base = 'https://en.wikipedia.org/wiki/'
  const title = 'some title'
  const expected = `${base}${encodeURI(title)}`
  const result = 'some result'

  let res

  before(async () => {
    fetch.resolves(result)
    res = await fetchPage(title)
  })

  it('called fetch with the right url', () => {
    expect(fetch).to.have.been.calledOnceWith(expected)
  })

  it('returned the expected result', () => {
    expect(res).to.equal(result)
  })
})
