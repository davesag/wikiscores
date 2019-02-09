const { expect } = require('chai')
const { stub } = require('sinon')
const proxyquire = require('proxyquire')

describe('src/utils/makeThrottle', () => {
  const plugin = stub().returns('yay')

  class Throttle {
    constructor() {
      return { plugin }
    }
  }

  const makeThrottle = proxyquire('src/utils/makeThrottle', {
    'superagent-throttle': Throttle
  })

  let result

  before(() => {
    result = makeThrottle()
  })

  it('called plugin()', () => {
    expect(plugin).to.have.been.called
  })
})
