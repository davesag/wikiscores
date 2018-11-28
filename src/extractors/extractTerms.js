const isOpinion = $ =>
  function() {
    const title = $(this).text()
    return title.endsWith('term opinions')
  }

const toData = $ =>
  function() {
    const $this = $(this)
    const text = $this.text()
    const year = parseInt(text.slice(0, 4))
    const name = $this.attr('href').slice('/wiki/'.length)

    return { year, text, name }
  }

const extractTerms = $ =>
  $('li > a')
    .filter(isOpinion($))
    .map(toData($))
    .toArray()

module.exports = extractTerms
