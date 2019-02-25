const fetchPage = require('./fetchers/fetchPage')
const fetchPageInfo = require('./fetchers/fetchPageInfo')
const parseTerms = require('./parsers/parseTerms')
const parseCases = require('./parsers/parseCases')
const parseInfo = require('./parsers/parseInfo')
const convertTypes = require('./parsers/convertTypes')
const makeThrottle = require('./utils/makeThrottle')
const { write } = require('./utils/cache')
const db = require('./utils/db')

const { CASE_LIST_PAGE } = require('./constants')

const exists = item => item !== null && item !== undefined

const run = async () => {
  await db.ensureIndex({ fieldName: 'url' })

  const throttle = makeThrottle()
  write('throttle', throttle)

  const termsPage = await fetchPage(CASE_LIST_PAGE)
  db.persistence.compactDatafile()
  const { terms } = parseTerms(termsPage)

  const termPages = await Promise.all(
    terms.map(async ({ year, name }) => ({
      year,
      page: await fetchPage(name)
    }))
  )
  console.log('fetched', termPages.length, 'term pages')
  db.persistence.compactDatafile()

  const caseLoad = termPages
    .map(({ year, page }) => ({ year, ...parseCases(page) }))
    .reduce((acc, { year, cases }) => {
      if (!cases) {
        console.log('skipped cases for year', year)
      }
      acc = [...acc, ...cases.map(_case => ({ year, ..._case }))]
      return acc
    }, [])
  console.log('found', caseLoad.length, 'cases')

  const casePages = await Promise.all(
    caseLoad.map(async ({ name, year }) => ({
      year,
      page: await fetchPageInfo(name)
    }))
  )
  console.log('loaded', casePages.length, 'case pages')
  db.persistence.compactDatafile()

  return convertTypes(
    casePages.map(({ year, page }) => ({ term: year, ...parseInfo(page) }))
  )
}

module.exports = run
