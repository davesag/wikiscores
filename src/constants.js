const ACCEPT_STRING =
  'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8'
const AGENT_STRING =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.106 Safari/537.36'
const CASE_LIST_PAGE = 'Lists_of_United_States_Supreme_Court_cases'
const DEFAULT_CONCURRENCY = 10 // simultanious requests
const DEFAULT_THROTTLE_RATE = 99 // requests per second

module.exports = {
  ACCEPT_STRING,
  AGENT_STRING,
  CASE_LIST_PAGE,
  DEFAULT_CONCURRENCY,
  DEFAULT_THROTTLE_RATE
}
