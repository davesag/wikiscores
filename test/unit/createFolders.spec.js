const { expect } = require('chai')
const { stub, match } = require('sinon')
const proxyquire = require('proxyquire')

describe('src/createFolders', () => {
  const mkdirp = stub()
  const promisify = stub().returns(mkdirp)
  const path = { join: stub(), dirname: stub() }

  const createFolders = proxyquire('src/createFolders', {
    mkdirp,
    path,
    util: { promisify }
  })

  const outputPath = 'test/output.csv'

  before(async () => {
    path.dirname.returns('test')
    path.join.returns(outputPath)
    mkdirp.resolves()
    await createFolders(outputPath)
  })

  it('called path.dirname with the output path', () => {
    expect(path.dirname).to.have.been.calledOnceWith('test/output.csv')
  })

  it('called mkdirp with the path', () => {
    expect(mkdirp).to.have.been.calledOnceWith('test')
  })
})
