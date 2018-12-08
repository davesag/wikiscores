const fetch = require('./fetch')

const base = 'https://en.wikipedia.org/wiki/'

const fetchPage = async title => fetch(`${base}${encodeURI(title)}`)

module.exports = fetchPage
