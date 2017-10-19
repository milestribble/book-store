const books = require('./db/books_db.js')

module.exports = {
  create : (book) =>
    books.create(book)
      .then(result => result[0].id),

  getAll : () =>
    books.getAll()
      .then(allBooks => {
        let updatedBooks = allBooks.map(book => {
          return books.getAuthorsByBookId(book.id)
            .then(authors => {
              book.authors = authors.map(author => author.name)
            })
        })
        return Promise.all(updatedBooks)
          .then(()=>allBooks)
      }),

  getBy : (property, value) =>
    books.getBy(property, value),

  update : (book) =>
    books.update(book),

  destroy : (bookId) =>
    books.destroy(bookId),

  linkAuthor : (bookId, authorId) =>
    book.linkAuthor(bookId, authorId),

  unlinkAllAuthors : (bookId) =>
    books.unlinkAllAuthors(bookId)

}

const getAuthorsByBookId = (book_id) => {
  return books.getAuthorsByBookId(book_id)
}
