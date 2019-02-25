const { expect } = require('chai')
const { stub, match } = require('sinon')
const proxyquire = require('proxyquire')

describe('src/utils/db', () => {
  const database = 'a database'

  const Datastore = {
    create: stub().returns(database)
  }

  const db = proxyquire('src/utils/db', {
    'nedb-promises': Datastore
  })

  it('called Datastore.create with a filename', () => {
    expect(Datastore.create).to.have.been.calledWith(
      match({
        filename: match.string
      })
    )
  })

  it('returns the right result', () => {
    expect(db).to.equal(database)
  })
})
