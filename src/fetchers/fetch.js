const request = require('superagent')
const Throttle = require('superagent-throttle')

const throttle = new Throttle({
  active: true, // set false to pause queue
  rate: 199, // how many requests can be sent every `ratePer`
  ratePer: 1000, // number of ms in which `rate` requests may be sent
  concurrent: 20 // how many requests can be sent concurrently
})

const agentString =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.106 Safari/537.36'
const acceptString =
  'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8'

const fetch = async url => {
  console.log('fetching', url)
  try {
    const res = await request
      .get(url)
      .use(throttle.plugin())
      .set('Cache-Control', 'max-age=0')
      .set('Upgrade-Insecure-Requests', 1)
      .set('User-Agent', agentString)
      .set('Accept', acceptString)
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
