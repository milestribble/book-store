const router = require('express').Router()
const bcrypt = require('bcrypt')
const users = require('../../models/users_model')
const sessions = require('../../models/session_model')

router.get('/signup', (req, res) => {
  if (req.session) {
    res.status(302).redirect('/books')
  } else {
    res.render('signup', {session: false, err: null})
  }
})

router.post('/signup', (req, res) => {
  if (req.session) {
    res.status(302).redirect('/books')
  } else {
    console.log(req.body);
    let user = {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      role: req.body.admin ? 'admin' : 'customer'
    }
    users.doesExistBy('email',user.email)
    .then(doesExist => {

      if(doesExist){
        res.render('signup', {session: false, err: 'That email is taken.'})
      } else {
        return users.doesExistBy('username',user.username)
      }
    })
    .then(doesExist => {
      if(doesExist){
        res.render('signup', {session: false, err: 'That email is taken.'})
      } else {
        return bcrypt.hash(user.password, 10)
      }
    })
    .then(encryptedPassword => {
          user.password = encryptedPassword
          return users.create(user)
        })
        .then(results => {
            let user = results[0]
            sessions.create(user.id)
            .then(results => {
              let sessionId = results[0].id
              req.session = {id: sessionId, user: user}
              res.status(302).redirect('/books')
            })
        })
      }
    })

router.get('/login', (req, res) => {
  if (req.session) {
    res.status(302).redirect('/books')
  } else {
    res.render('login',{session: false, err: null})
  }
})

router.post('/login', (req, res) => {
  console.log(`req.session`, req.body)
  if (req.session) {
    res.status(302).redirect('/books')
  } else {
    let { username, password } = req.body
      users.doesExistBy('username', username)
      .then(doesExist => {
        if(doesExist) {
          //Compare passwords
          return users.getBy('username', username)
          .then(result => {
            let user = result[0]
            bcrypt.compare(password, user.encrypted_password)
              .then(isValid => {
                if(isValid) {
                  return sessions.create(user.id)
                } else {
                  res.render('login',{session: false, err: 'Username and password do not match'})
                }
              })
              .then(sesResults => {
                let sessionId = sesResults[0].id
                req.session = { id: sessionId, user: user }
                res.status(302).redirect('/books')
              })
          })

        } else {
          res.render('login',{session: false, err: 'Username and password do not match'})

          //redirect to the login with more info
        }
      })
    // let { username, password } = req.body
    // users.getBy('username',username)
      // .then(results =>
      //   results.length === 0
      //   ? res.render('login',{err: 'Username and password do not match'})
      //   : bcrypt.compare(password, results[0].password)
      //       .then(isValid => isValid
      //         ? sessions.create(user.id)
      //         : res.render('login',{err: 'Username and password do not match'})
      //       )
      //       .then(sesResults => {
      //         let sessionId = sesResults[0].id
      //         req.session = {id: sessionId, user: results[0]}
      //         res.status(302).redirect('/books')
      //       })
      // )

  }
})

router.get('/logout', (req, res) => {
  if (!req.session) {
    res.status(302).redirect('/login')
  } else {
    sessions.destroy(req.session.id)
    delete req.session
    res.render('login',{session: false, err:null})
  }
})

module.exports = router
