const { parse } = require('query-string')

/* istanbul ignore next */
const isCase = $ =>
  function() {
    const title = $(this).text()
    return title.includes(' v. ')
  }

/* istanbul ignore next */
const titleFrom = url => {
  const [_, query] = url.split('?')
  if (!query) return undefined
  return parse(query).title
}

/* istanbul ignore next */
const stripHash = name =>
  name ? (name.includes('#') ? name.split('#')[1] : name) : undefined

/* istanbul ignore next */
const replaceIllegalCharacters = name => name.replace(/’/g, "'")

/* istanbul ignore next */
const clean = name => replaceIllegalCharacters(stripHash(name))

/* istanbul ignore next */
const toData = $ =>
  function() {
    const $this = $(this)
    const title = $this.closest('td').text()
    const parties = $this.text()
    const url = $this.attr('href')
    const name = url.startsWith('/wiki/')
      ? url.slice('/wiki/'.length)
      : url.startsWith('/w/index.php?')
      ? titleFrom(url)
      : undefined

    console.log('name', clean(name))

    return { title, parties, name: clean(name) }
  }

// https://en.wikipedia.org/w/index.php?action=info&title=Williamson_v._Mazda_Motor_of_America,_Inc.

const extractCases = $ =>
  $('td > small > i > a')
    .filter(isCase($))
    .map(toData($))
    .toArray()

module.exports = extractCases
