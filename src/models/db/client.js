const pgp = require('pg-promise')()

const config = {
  database: process.env.NODE_ENV === 'test'
              ? 'bookstore_test'
              : 'bookstore',
  host: 'localhost',
  port: 5432
}

const db = pgp(config)

module.exports = {
  db : db,
  query : db.query
}
