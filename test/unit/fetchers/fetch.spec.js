const { expect } = require('chai')
const { stub } = require('sinon')
const proxyquire = require('proxyquire')
const faker = require('faker')

describe('src/fetchers/fetch', () => {
  const text = 'some text'
  const status = 200
  const throttle = ' a throttle'
  const response = { text, status }

  const db = {
    findOne: stub(),
    update: stub()
  }

  const request = {
    get: stub(),
    use: stub(),
    retry: stub(),
    set: stub()
  }

  const makeThrottle = stub().returns(throttle)
  const retryDelay = stub()

  const fetch = proxyquire('src/fetchers/fetch', {
    superagent: request,
    'superagent-retry-delay': retryDelay,
    '../utils/db': db,
    '../utils/makeThrottle': makeThrottle
  })

  const url = faker.internet.url()

  const resetStubs = () => {
    makeThrottle.resetHistory()
    request.get.reset()
    db.findOne.reset()
    db.update.reset()
    request.retry.reset()
    request.use.reset()
    request.set.reset()
  }

  let res

  context('we need to read the document afresh', () => {
    const saved = { savedAt: new Date(0), text }

    before(async () => {
      db.findOne.resolves(saved)
      request.get.returns(request)
      request.use.returns(request)
      request.retry.returns(request)
      request.set.returns(request)
      request.set.onCall(5).resolves(response)
      db.update.resolves()
      res = await fetch(url)
    })

    after(resetStubs)

    it('called db.findOne with url', () => {
      expect(db.findOne).to.have.been.calledWith({ url })
    })

    it('called request.get with url', () => {
      expect(request.get).to.have.been.calledOnceWith(url)
    })

    it('called request.use with throttle', () => {
      expect(request.use).to.have.been.calledWith(throttle)
    })

    it('called retry with 2, 10000, [401, 404]', () => {
      expect(request.retry).to.have.been.calledWith(2, 10000, [401, 404])
    })

    it('called request.set 6 times', () => {
      expect(request.set.callCount).to.equal(6)
    })

    it('called db.update', () => {
      expect(db.update).to.have.been.called
    })

    it('returned the correct result', () => {
      expect(res).to.equal(text)
    })
  })

  context('we get an error from the server', () => {
    const saved = { savedAt: new Date(0), text }

    before(async () => {
      db.findOne.resolves(saved)
      request.get.returns(request)
      request.use.returns(request)
      request.retry.returns(request)
      request.set.returns(request)
      request.set.onCall(5).resolves({ ...response, status: 404 })
      res = await fetch(url)
    })

    after(resetStubs)

    it('called db.findOne with url', () => {
      expect(db.findOne).to.have.been.calledWith({ url })
    })

    it('called request.get with url', () => {
      expect(request.get).to.have.been.calledOnceWith(url)
    })

    it('called request.use with throttle', () => {
      expect(request.use).to.have.been.calledWith(throttle)
    })

    it('called retry with 2, 10000, [401, 404]', () => {
      expect(request.retry).to.have.been.calledWith(2, 10000, [401, 404])
    })

    it('called request.set 6 times', () => {
      expect(request.set.callCount).to.equal(6)
    })

    it('called db.update', () => {
      expect(db.update).not.to.have.been.called
    })

    it('returned null', () => {
      expect(res).to.equal(null)
    })
  })

  context('we have the document in cache', () => {
    const saved = { savedAt: new Date(), text }

    before(async () => {
      db.findOne.resolves(saved)
      res = await fetch(url)
    })

    after(resetStubs)

    it('called db.findOne with url', () => {
      expect(db.findOne).to.have.been.calledWith({ url })
    })

    it('did not call request.get', () => {
      expect(request.get).not.to.have.been.called
    })

    it('did not call request.use', () => {
      expect(request.use).not.to.have.been.called
    })

    it('did not call retry', () => {
      expect(request.retry).not.to.have.been.called
    })

    it('did not call request.set', () => {
      expect(request.set).not.to.have.been.called
    })

    it('called db.update', () => {
      expect(db.update).not.to.have.been.called
    })

    it('returned the correct result', () => {
      expect(res).to.equal(text)
    })
  })

  context('all goes badly', () => {
    const saved = { savedAt: new Date(0), text }

    before(async () => {
      db.findOne.resolves(saved)
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
