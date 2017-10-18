const router = require('express').Router()

const books = require('../../models/books_model')

router







HTTP Request Type	URL Path	View File	Description
GET	'/books'	/books/index	display a list of all books
GET	'/books/new'	/books/new	return an HTML form for creating a new book
POST	'/books'	--	create a new book
GET	'/books/:id'	/books/show	display a specific book
GET	'/books/:id/edit'	/books/edit	return an HTML form for editing a book
PUT	'/books/:id'	--	update a specific book
DELETE	'/books/:id'	--	delete a specific book
