const { expect } = require('chai')
const { read, write, clear, reset } = require('src/utils/cache')

describe('src/utils/cache', () => {
  const stuff = 'some stuff'

  before(() => {
    reset()
  })

  after(() => {
    reset()
  })

  it('writes then reads then clears', () => {
    write('stuff', stuff)
    expect(read('stuff')).to.equal(stuff)
    clear('stuff')
    expect(read('stuff')).to.be.undefined
  })
})
