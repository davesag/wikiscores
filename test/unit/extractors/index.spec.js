const { expect } = require('chai')
const { stub } = require('sinon')
const proxyquire = require('proxyquire')

describe('src/extractors', () => {
  const extract = stub()

  proxyquire('src/extractors', {
    './extract': extract
  })

  it('called extract', () => {
    expect(extract).to.have.been.called
  })
})
