const { expect } = require('chai')
const { stub, match } = require('sinon')
const proxyquire = require('proxyquire')

describe('src/utils/writeCSV', () => {
  const csvWriter = {
    writeRecords: stub()
  }

  const CSVWriter = {
    createObjectCsvWriter: stub().returns(csvWriter)
  }

  const writeCSV = proxyquire('src/utils/writeCSV', {
    'csv-writer': CSVWriter
  })

  const resetStubs = () => {
    csvWriter.writeRecords.resetHistory()
    CSVWriter.createObjectCsvWriter.resetHistory()
  }

  const data = { test: 'test' }
  const records = [data]
  const header = [{ id: 'test', title: 'Test' }]

  before(() => {
    csvWriter.writeRecords.resolves()
  })

  context('when given a path', () => {
    const path = 'test.csv'

    before(async () => {
      const writer = writeCSV(path)
      await writer(records)
    })

    after(resetStubs)

    it('called createObjectCsvWriter with the right path and headers', () => {
      expect(CSVWriter.createObjectCsvWriter).to.have.been.calledOnceWith(
        match({
          path,
          header
        })
      )
    })

    it('called csvWriter.writeRecords', () => {
      expect(csvWriter.writeRecords).to.have.been.calledOnceWith(match(records))
    })
  })

  context('when not given a path', () => {
    const path = 'output.csv'

    before(async () => {
      const writer = writeCSV()
      await writer(records)
    })

    after(resetStubs)

    it('called createObjectCsvWriter with the right path and headers', () => {
      expect(CSVWriter.createObjectCsvWriter).to.have.been.calledOnceWith(
        match({
          path,
          header
        })
      )
    })
  })
})
