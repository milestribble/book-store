const Cryptr = require('cryptr')
const onHeaders = require('on-headers')
const sessions = require('../models/session_model')
const users = require('../models/users_model')

const cryptr = new Cryptr('htrsgjkljhgb3@%#$#cfjku456y5ju1')

module.exports.sessionMiddleware = (req, res, next) => {
  let sessionId
  if(req.cookies.sessionCookie) {
    sessionId = +cryptr.decrypt(req.cookies.sessionCookie)
    sessions.getUserId(sessionId)
    .then(results => {
      if (results.length === 0) {
        next()
      } else {
        users.getBy('id', results[0].user_id)
          .then(results => {
            req.session = { id: sessionId, user: results[0] }
            next()
          })
      }
    })
  }else{
    next()
  }

  onHeaders(res, function() {
    console.log(req.cookies);
    if(req.session) {
      res.cookie('sessionCookie',  cryptr.encrypt(req.session.id))
    } else {
      res.cookie('sessionCookie',  '', {maxAge: 0} )
    }
  })



}
