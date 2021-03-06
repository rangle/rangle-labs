'use strict'

var dbm
var type
var seed

/**
 * We receive the dbmigrate dependency from dbmigrate initially.
 * This enables us to not have to rely on NODE_PATH.
 */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate
  type = dbm.dataType
  seed = seedLink
}

exports.up = function(db, cb) {
  shell.exec('mongo rangle-labs ./migrations/mongo-scripts/positionUp.js')
  cb()
}

exports.down = function(db, cb) {
  shell.exec('mongo rangle-labs ./migrations/mongo-scripts/positionDown.js')
  cb()
}

exports._meta = {
  version: 1.3,
}
