const books = require('./db/books_db.js')

module.exports = {
  create : (book) =>
    books.create(book)
      .then(result => result[0].id),

  getAll : () =>
    books.getAll(),

  getBy : (property, value) =>
    books.getBy(property, value)

  update : (book) =>
    books.update(book),

  destroy : (bookId) =>
    books.destroy(bookId),

  linkAuthor : (bookId, authorId) =>
    book.linkAuthor(bookId, authorId)

  unlinkAllAuthors : (bookId) =>
    books.unlinkAllAuthors(bookId)

}
