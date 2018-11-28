const extract = (selector, suffix) => $ =>
  !suffix
    ? $(`${selector} > td:last-child`).text()
    : $(`${selector} > td:last-child > ${suffix}`).text()

module.exports = extract
