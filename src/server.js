const express = require('express')
const app = express()
const bcrypt = require('bcrypt')
const path = require('path')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const { sessionMiddleware } = require('./server/middlewares')
const auth = require('./server/routes/auth')
const booksApi = require('./server/routes/books')



const {query} = require('./models/db/client')

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(cookieParser())
app.use(sessionMiddleware)
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())






//TEMPORARY
// app.get('/dashboard', (req, res) => {
//   bookis.getAll()
//   .then(results => {
//     res.render('dashboard', { books: results })
//   })
//
// })

app.get('/', (req,res) => {
  if (req.session) {
    res.status(302).redirect('/books')
  } else {
    res.redirect('/login')
  }
})
app.get('/books', (req, res) => {
  if (req.session) {
    console.log(req.session);
    res.render('dashboard', {session: req.session})
    // res.status(302).redirect('/books')
  } else {
    res.redirect('/login')
  }
})
app.use('/api/', booksApi)
app.use('/', auth)

app.use(express.static('src/public'))

app.listen(3000)
