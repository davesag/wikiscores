const Throttle = require('superagent-throttle')
const { read } = require('../utils/cache')
const { MAX_CONCURRENCY, MAX_THROTTLE_RATE } = require('../constants')

const makeThrottle = () => {
  const concurrent = read('concurrency') || MAX_CONCURRENCY
  const rate = read('throttleRate') || MAX_THROTTLE_RATE

  const throttle = new Throttle({
    rate,
    concurrent,
    active: true, // set false to pause queue
    ratePer: 1000 // number of ms in which `rate` requests may be sent
  })
  return throttle.plugin()
}

module.exports = makeThrottle
