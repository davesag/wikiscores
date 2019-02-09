const request = require('superagent')
const Throttle = require('superagent-throttle')
const { read } = require('../utils/cache')
const {
  ACCEPT_STRING,
  AGENT_STRING,
  DEFAULT_CONCURRENCY,
  DEFAULT_THROTTLE_RATE
} = require('../constants')

const fetch = async url => {
  const concurrent = read('concurrency') || DEFAULT_CONCURRENCY
  const rate = read('throttleRate') || DEFAULT_THROTTLE_RATE

  const throttle = new Throttle({
    rate,
    concurrent,
    active: true, // set false to pause queue
    ratePer: 1000 // number of ms in which `rate` requests may be sent
  })

  console.log('fetching', url)
  try {
    const res = await request
      .get(url)
      .use(throttle.plugin())
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
