const A_DAY = 24 * 60 * 60 * 1000
const ACCEPT_STRING =
  'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8'
const AGENT_STRING =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.106 Safari/537.36'
const CASE_LIST_PAGE = 'Lists_of_United_States_Supreme_Court_cases'
const MAX_CONCURRENCY = 5 // simultanious requests
const MAX_THROTTLE_RATE = 60 // requests per second
const FILE_CACHE = 'wikiscores.db'
const INFO_BASE = 'https://en.wikipedia.org/w/index.php?action=info&title='

const TITLES = {
  articleId: 'Article Id',
  contentModel: 'Content Model',
  edits: 'Total Edits',
  recentEdits: 'Recent Edits',
  monthCount: 'Number of Recent Views',
  createdAt: 'Creation Date'
}

module.exports = {
  A_DAY,
  ACCEPT_STRING,
  AGENT_STRING,
  CASE_LIST_PAGE,
  FILE_CACHE,
  INFO_BASE,
  MAX_CONCURRENCY,
  MAX_THROTTLE_RATE,
  TITLES
}
