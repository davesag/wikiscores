const extractTableData = (selector, suffix) => $ => {
  const sel = suffix
    ? `${selector} > td:last-child > ${suffix}`
    : `${selector} > td:last-child`

  return $(sel).text()
}

module.exports = extractTableData
