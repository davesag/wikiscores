const fetch = require('./fetch')

const base = 'https://en.wikipedia.org/w/index.php?action=info&title='

const fetchPageInfo = async title => fetch(`${base}${title}`)

module.exports = fetchPageInfo
