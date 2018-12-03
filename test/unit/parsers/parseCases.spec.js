const { expect } = require('chai')
const { stub } = require('sinon')
const proxyquire = require('proxyquire')

describe('src/parsers/parseCases', () => {
  const extractData = stub()

  proxyquire('src/parsers/parseCases', {
    'src/parsers/extractData': extractData
  })

  it("called extractData with ['cases']", () => {
    expect(extractData).to.have.been.calledWith(['cases'])
  })
})
