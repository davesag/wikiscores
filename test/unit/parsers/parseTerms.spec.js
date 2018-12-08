const { expect } = require('chai')
const { stub } = require('sinon')
const proxyquire = require('proxyquire')

describe('src/parsers/parseTerms', () => {
  const extractData = stub()

  proxyquire('src/parsers/parseTerms', {
    './extractData': extractData
  })

  it("called extractData with ['terms']", () => {
    expect(extractData).to.have.been.calledWith(['terms'])
  })
})
