const fetch = require('src/fetchers/fetch')

const base = 'https://en.wikipedia.org/'

const fetchRaw = async path => fetch(`${base}${path}`)

module.exports = fetchRaw
