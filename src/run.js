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
    terms.map(({ name }) => fetchPage(name)).filter(exists)
  )
  console.log('fetched', termPages.length, 'term pages')
  db.persistence.compactDatafile()

  const caseLoad = termPages.map(parseCases).reduce((acc, { cases }) => {
    acc = [...acc, ...cases]
    return acc
  }, [])
  console.log('found', caseLoad.length, 'cases')

  const casePages = await Promise.all(
    caseLoad.map(({ name }) => fetchPageInfo(name)).filter(exists)
  )
  console.log('loaded', casePages.length, 'case pages')
  db.persistence.compactDatafile()

  return convertTypes(casePages.map(parseInfo))
}

module.exports = run
