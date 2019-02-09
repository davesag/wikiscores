const { tmpdir } = require('os')
const path = require('path')
const Datastore = require('nedb-promises')

const { FILE_CACHE } = require('../constants')

const tmp = path.resolve(tmpdir())
const filename = path.join(tmp, FILE_CACHE)
const db = Datastore.create({ filename })

module.exports = db
