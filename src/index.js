const fetchPage = require('src/fetchers/fetchPage')
const fetchPageInfo = require('src/fetchers/fetchPageInfo')
const parseTerms = require('src/parsers/parseTerms')
const parseCases = require('src/parsers/parseCases')
const parseInfo = require('src/parsers/parseInfo')
const writeCSV = require('src/writeCSV')

const notNull = item => item !== null && item !== undefined

const run = async () => {
  const termsPage = await fetchPage(
    'Lists_of_United_States_Supreme_Court_cases'
  )
  // console.log('termsPage', termsPage)
  const { terms } = parseTerms(termsPage)

  const termPages = await Promise.all(
    terms.map(({ name }) => fetchPage(name)).filter(notNull)
  )
  console.log('fetched', termPages.length, 'term pages')

  const caseLoad = termPages.map(parseCases).reduce((acc, { cases }) => {
    acc = [...acc, ...cases]
    return acc
  }, [])
  console.log('found', caseLoad.length, 'cases')

  const casePages = await Promise.all(
    caseLoad.map(({ name }) => fetchPageInfo(name)).filter(notNull)
  )
  console.log('loaded', casePages.length, 'case pages')

  return casePages.map(parseInfo)
}

run()
  .then(writeCSV('output.csv'))
  .catch(err => {
    console.error('error', err)
  })
