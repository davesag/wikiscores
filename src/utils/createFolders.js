const mkdirp = require('mkdirp')
const path = require('path')

const createFolders = async fullPath => {
  try {
    const folderPath = path.dirname(fullPath)
    await mkdirp(folderPath)
  } catch (err) /* istanbul ignore next */ {
    console.error('caught', err)
  }
}

module.exports = createFolders
