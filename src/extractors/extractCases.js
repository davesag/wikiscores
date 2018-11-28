const { parse } = require('query-string')

const isCase = $ =>
  function() {
    const title = $(this).text()
    return title.includes(' v. ')
  }

const titleFrom = url => {
  const [_, query] = url.split('?')
  if (!query) return undefined
  return parse(query).title
}

const stripHash = name =>
  name ? (name.includes('#') ? name.split('#')[1] : name) : undefined

const replaceIllegalCharacters = name => name.replace(/’/g, "'")

const clean = name => replaceIllegalCharacters(stripHash(name))

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
