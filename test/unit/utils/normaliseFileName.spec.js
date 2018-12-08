const { expect } = require('chai')

const normaliseFileName = require('src/utils/normaliseFileName')

describe('src/utils/normaliseFileName', () => {
  context('given filename ending in .csv', () => {
    const filename = 'some-file.csv'

    it('returns the same filename', () => {
      expect(normaliseFileName(filename)).to.equal(filename)
    })
  })

  context('given filename not ending in .csv', () => {
    const filename = 'some-file'
    const expected = `${filename}.csv`

    it('returns the filename with .csv appended', () => {
      expect(normaliseFileName(filename)).to.equal(expected)
    })
  })
})
