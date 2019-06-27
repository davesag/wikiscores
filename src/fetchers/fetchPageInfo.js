const fetch = require('./fetch')
const { INFO_BASE } = require('../constants')

const fetchPageInfo = async title => fetch(`${INFO_BASE}${title}`)

module.exports = fetchPageInfo
