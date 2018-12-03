const { expect } = require('chai')
const { stub } = require('sinon')
const proxyquire = require('proxyquire')
const faker = require('faker')

describe('src/fetchers/fetch', () => {
  const text = 'some text'
  const status = 200

  const request = {
    get: stub(),
    use: stub(),
    set: stub(),
    text,
    status
  }
  request.use.returns(request)
  request.set.returns(request)

  const throttle = {
    plugin: stub()
  }

  const Throttle = class {
    constructor() {
      return throttle
    }
  }

  const fetch = proxyquire('src/fetchers/fetch', {
    superagent: request,
    'superagent-throttle': Throttle
  })

  const url = faker.internet.url()

  const resetStubs = () => {
    request.get.reset()
    request.use.resetHistory()
    request.set.resetHistory()
  }

  let res

  context('all goes well', () => {
    before(async () => {
      request.get.returns(request)
      res = await fetch(url)
    })

    after(resetStubs)

    it('called Request.get with url', () => {
      expect(request.get).to.have.been.calledOnceWith(url)
    })

    it('returned the correct result', () => {
      expect(res).to.equal(text)
    })
  })

  context('all goes badly', () => {
    before(async () => {
      request.get.throws(new Error('oops'))
      res = await fetch(url)
    })

    after(resetStubs)

    it('called Request.get with url', () => {
      expect(request.get).to.have.been.calledOnceWith(url)
    })

    it('returned null', () => {
      expect(res).to.be.null
    })
  })
})
