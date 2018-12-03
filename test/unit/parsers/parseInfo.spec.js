const { expect } = require('chai')
const { stub } = require('sinon')
const proxyquire = require('proxyquire')

describe('src/parsers/parseInfo', () => {
  const extractData = stub()

  proxyquire('src/parsers/parseInfo', {
    'src/parsers/extractData': extractData
  })

  it("called extractData with ['cases']", () => {
    expect(extractData).to.have.been.calledWith([
      'title',
      'defaultSort',
      'length',
      'articleId',
      'contentModel',
      'watchers',
      'edits',
      'recentEdits',
      'monthCount',
      'createdAt',
      'creator'
    ])
  })
})
