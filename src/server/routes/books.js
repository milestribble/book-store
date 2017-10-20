const router = require('express').Router()

const books = require('../../models/books_model')

router.get('/books', (req, res) => {
  books.getAll()
  .then(results => {
    res.json(results)
  })
})

// router.get('/books/new', (req, res) => {
//
// })

router.post('/books', (req, res) => {
  if (req.session.user.role !== 'admin') {
    res.status(403).json("Unauthorised")
  } else {
    books.create(req.body)
    books.getAll()
    .then(results => {
      res.json(results)
    })
  }
})

router.get('/books/:id', (req, res) => {
  let id = req.body.params.id
  books.getBy('id', id)
  .then(results => {
    res.json(results[0])
  })
})

// router.get('/books/:id/edit', (req, res) => {
//
// })

router.put('/books/:id', (req, res) => {
  if (req.session.user.role !== 'admin') {
    res.status(403).json("Unauthorised")
  } else {
    console.log(req.body,'2stars');
    books.update(req.body)
    .then(() => {
      books.getAll()
      .then(results => {
        res.json(results)
      })
    })
  }
})

router.delete('/books/:id', (req, res) => {
  if (req.session.user.role !== 'admin') {
    res.status(403).json("Unauthorised")
  } else {
    let id = req.params.id
    books.destroy(id)
    .then(() => {
      books.getAll()
      .then(results => {
        res.json(results)
      })
    })
  }
})



module.exports = router







// HTTP Request Type	URL Path	View File	Description
// GET	'/books'	/books/index	display a list of all books
// --> GET	'/books/new'	/books/new	return an HTML form for creating a new book
// POST	'/books'	--	create a new book
// GET	'/books/:id'	/books/show	display a specific book
// --> GET	'/books/:id/edit'	/books/edit	return an HTML form for editing a book
// PUT	'/books/:id'	--	update a specific book
// DELETE	'/books/:id'	--	delete a specific book
