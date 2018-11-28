const { expect } = require('chai')
const { stub, spy } = require('sinon')
const proxyquire = require('proxyquire')

describe('src/extractors/extract', () => {
  const makeSelector = stub()
  const functionName = stub()
  const extractTableData = stub()
  const extractorFunction = stub()

  const base = '#base'

  const extract = proxyquire('src/extractors/extract', {
    'src/extractors/makeSelector': makeSelector,
    'src/extractors/functionName': functionName,
    'src/extractors/extractTableData': extractTableData
  })

  const resetStubs = () => {
    makeSelector.reset()
    functionName.reset()
    extractTableData.reset()
    extractorFunction.reset()
  }

  const activateStubs = () => {
    makeSelector.returns('selector')
    functionName.returns('test')
    extractTableData.returns({})
  }

  let ex

  context('without selector', () => {
    const name = 'testWithoutSelector'
    before(() => {
      activateStubs()
      ex = extract([[name]], base)
    })

    after(resetStubs)

    it("didn't call any extractor function", () => {
      expect(extractorFunction).not.to.have.been.called
    })

    it('called makeSelector with the name', () => {
      expect(makeSelector).to.have.been.calledOnceWith(name)
    })

    it('called functionName with the name', () => {
      expect(makeSelector).to.have.been.calledOnceWith(name)
    })
  })

  context('with selector', () => {
    context('without suffix', () => {
      const name = 'testWithSelector'
      const selector = 'test-with-selector'

      before(() => {
        ex = extract([[name, selector]], base)
      })

      after(resetStubs)

      it("didn't call any extractor function", () => {
        expect(extractorFunction).not.to.have.been.called
      })

      it("didn't call makeSelector", () => {
        expect(makeSelector).not.to.have.been.called
      })

      it('called extractTableData with the right params', () => {
        expect(extractTableData).to.have.been.calledOnceWith(
          `${base}-${selector}`,
          undefined
        )
      })
    })

    context('with suffix', () => {
      const name = 'testWithSelector'
      const selector = 'test-with-selector'
      const suffix = 'test-suffix'

      before(() => {
        ex = extract([[name, selector, suffix]], base)
      })

      after(resetStubs)

      it("didn't call any extractor function", () => {
        expect(extractorFunction).not.to.have.been.called
      })

      it("didn't call makeSelector", () => {
        expect(makeSelector).not.to.have.been.called
      })

      it('called extractTableData with the right params', () => {
        expect(extractTableData).to.have.been.calledOnceWith(
          `${base}-${selector}`,
          suffix
        )
      })
    })

    context('without base', () => {
      const name = 'testWithSelectorButNoBase'
      const selector = 'test-with-selector-but-no-base'

      before(() => {
        ex = extract([[name, selector]])
      })

      after(resetStubs)

      it("didn't call any extractor function", () => {
        expect(extractorFunction).not.to.have.been.called
      })

      it("didn't call makeSelector", () => {
        expect(makeSelector).not.to.have.been.called
      })

      it('called extractTableData with the right params', () => {
        expect(extractTableData).to.have.been.calledOnceWith(
          selector,
          undefined
        )
      })
    })
  })

  context('with selector function', () => {
    const name = 'testWithFunction'

    before(() => {
      activateStubs()
      ex = extract([[name, extractorFunction]], base)
    })

    after(resetStubs)

    it('assigned the supplied function', () => {
      expect(ex.test).to.equal(extractorFunction)
    })
  })
})
