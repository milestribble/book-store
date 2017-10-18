const app = require('express')()
const bcrypt = require('bcrypt')
const path = require('path')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const { sessionMiddleware } = require('./server/middlewares')
const auth = require('./server/routes/auth')

const {query} = require('./models/db/client')

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(cookieParser())
app.use(sessionMiddleware)
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.get('/', (req,res) => {
  if (req.session) {
    res.status(302).redirect('/books')
  } else {
    res.redirect('/login')
  }
})

app.get('/books', (req, res) => {
  res.send('Books')
})
app.use('/', auth)

app.listen(3000)
