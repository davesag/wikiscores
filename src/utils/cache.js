let cache = {}

const write = (key, value) => {
  cache[key] = value
}

const read = key => cache[key]

const clear = key => {
  delete cache[key]
}

const reset = () => {
  cache = {}
}

module.exports = {
  write,
  read,
  clear,
  reset
}
