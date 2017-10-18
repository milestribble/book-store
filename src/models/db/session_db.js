const { query } = require('./client.js')

module.exports = {
  create : (userId) =>
    query(`INSERT INTO sessions (user_id)
            VALUES ($1)
            RETURNING id`,[userId]),

  getUserId : (sessionId) =>
    query(`SELECT user_id FROM sessions WHERE id = $1`,[sessionId]),

  destroy : (sessionId) =>
    query(`DELETE FROM sessions WHERE id = $1`,[sessionId])

}
