const sessions = require('./db/session_db')


module.exports = {
  create : (userId) =>
    sessions.create(userId),

  getUserId : (sessionId) =>
    sessions.getUserId(sessionId),

  destroy : (sessionId) =>
    sessions.destroy(sessionId)

}
