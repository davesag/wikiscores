const pluralize = require('pluralize')
const fetchPage = require('./fetchers/fetchPage')
const fetchPageInfo = require('./fetchers/fetchPageInfo')
const parseTerms = require('./parsers/parseTerms')
const parseCases = require('./parsers/parseCases')
const parseInfo = require('./parsers/parseInfo')
const convertTypes = require('./parsers/convertTypes')
const makeThrottle = require('./utils/makeThrottle')
const { write } = require('./utils/cache')
const db = require('./utils/db')
const { CASE_LIST_PAGE, INFO_BASE } = require('./constants')

const printProgress = (...progress) => {
  process.stdout.clearLine()
  process.stdout.cursorTo(0)
  process.stdout.write(progress.join(' '))
}

const run = async () => {
  await db.ensureIndex({ fieldName: 'url' })

  const throttle = makeThrottle()
  write('throttle', throttle)

  const termsPage = await fetchPage(CASE_LIST_PAGE)
  db.persistence.compactDatafile()
  const { terms } = parseTerms(termsPage)

  printProgress('loading term pages…')
  const termPages = await Promise.all(
    terms.map(async ({ year, name }) => ({
      year,
      page: await fetchPage(name)
    }))
  )
  printProgress('fetched', termPages.length, 'term pages\n')
  db.persistence.compactDatafile()

  printProgress('reading cases')
  const caseLoad = termPages
    .map(({ year, page }) => ({ year, ...parseCases(page) }))
    .reduce((acc, { year, cases }) => {
      if (cases) {
        acc = [...acc, ...cases.map(_case => ({ year, ..._case }))]
      }
      return acc
    }, [])
  printProgress('found', pluralize('case', caseLoad.length, true), '\n')

  const skipped = []

  const casePages = await Promise.all(
    caseLoad.map(async ({ year, name }) => {
      const page = await fetchPageInfo(name)
      printProgress(`fetched ${INFO_BASE}${name} \n`)
      const parsed = parseInfo(page)
      if (!parsed.createdAt) {
        printProgress('Page missing metadata. Skipping\n')
        skipped.push({ term: year, ...parsed })
      }
      return { term: year, ...parsed }
    })
  )
  const processed = casePages
    .filter(({ createdAt }) => !!createdAt)
    .map(convertTypes)

  printProgress('processed', pluralize('page', processed.length, true), '\n')
  if (skipped.length) {
    printProgress('skipped', pluralize('page', skipped.length, true), '\n')
  }

  db.persistence.compactDatafile()
  return { processed, skipped }
}

module.exports = run
