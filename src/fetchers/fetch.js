const request = require('superagent')
const retryDelay = require('superagent-retry-delay')

const { read } = require('../utils/cache')
const makeThrottle = require('../utils/makeThrottle')
const db = require('../utils/db')

const { ACCEPT_STRING, AGENT_STRING, A_DAY } = require('../constants')
retryDelay(request)

const fetch = async url => {
  const throttle = read('throttle') || makeThrottle()
  const yesterday = new Date().getTime() - A_DAY

  try {
    // check if we grabbed it recently
    const doc = await db.findOne({ url })
    if (doc && doc.savedAt.getTime() > yesterday) {
      return doc.text
    }
    // else go grab it again
    const res = await request
      .get(url)
      .use(throttle)
      .retry(2, 10000, [401, 404])
      .set('Cache-Control', 'max-age=0')
      .set('Upgrade-Insecure-Requests', 1)
      .set('User-Agent', AGENT_STRING)
      .set('Accept', ACCEPT_STRING)
      .set('Accept-Encoding', 'gzip, deflate')
      .set('Accept-Language', 'en-US;q=0.9,en;q=0.8')

    const { status, text } = res
    console.log('fetched', url, status)
    if (status !== 200)
      throw new Error(`Could not fetch ${url}: got status ${status}`)
    // save it to the cache
    await db.update({ url }, { url, savedAt: new Date(), text })
    db.persistence.compactDatafile()
    return text
  } catch (err) {
    console.error('url', url)
    console.error('caught', err)
    return null
  }
}

module.exports = fetch
