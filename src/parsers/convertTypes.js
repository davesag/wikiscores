const PARSE_PATTERN = /([\d]{2}):([\d]{2}),\s([\d]{1,2})\s([A-Za-z]+)\s([\d]{4})/

const MONTHS = {
  January: 1,
  February: 2,
  March: 3,
  April: 4,
  May: 5,
  June: 6,
  July: 7,
  August: 8,
  September: 9,
  October: 10,
  November: 11,
  December: 12
}

// TODO: parse this better
const toDate = date => {
  // 02:03, 30 December 2011
  if (!date) return ''
  try {
    const matched = date.match(PARSE_PATTERN)
    if (!matched) return ''
    const [all, hour, minute, day, monthName, year] = matched
    const month = `${MONTHS[monthName]}`.padStart(2, '0')

    return `${year}-${month}-${day.padStart(2, '0')}T${hour}:${minute}:00.000Z`
  } catch (err) /* istanbul ignore next */ {
    console.error('date', date)
    console.error('threw', err)
    return ''
  }
}

const stripCommas = data =>
  typeof data === 'string' ? data.replace(/,/g, '') : data
const toInt = data => (!data ? 0 : parseInt(stripCommas(data)))

const CONVERTERS = {
  length: toInt,
  articleId: toInt,
  edits: toInt,
  recentEdits: toInt,
  monthCount: toInt,
  createdAt: toDate
}

const convert = data =>
  Object.keys(data).reduce((acc, elem) => {
    acc[elem] = CONVERTERS[elem] ? CONVERTERS[elem](data[elem]) : data[elem]
    return acc
  }, {})

const convertTypes = data => data.map(convert)

module.exports = convertTypes
