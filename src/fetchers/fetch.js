const request = require('superagent')
const { read } = require('../utils/cache')
const makeThrottle = require('../utils/makeThrottle')

const { ACCEPT_STRING, AGENT_STRING } = require('../constants')

const fetch = async url => {
  const throttle = read('throttle') || makeThrottle()

  console.log('fetching', url)
  try {
    const res = await request
      .get(url)
      .use(throttle)
      .set('Cache-Control', 'max-age=0')
      .set('Upgrade-Insecure-Requests', 1)
      .set('User-Agent', AGENT_STRING)
      .set('Accept', ACCEPT_STRING)
      .set('Accept-Encoding', 'gzip, deflate')
      .set('Accept-Language', 'en-US;q=0.9,en;q=0.8')
    console.log('fetched', url, res.status)
    return res.text
  } catch (err) {
    console.error('url', url)
    console.error('caught', err)
    return null
  }
}

module.exports = fetch
