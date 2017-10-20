const { query } = require('./client.js')

module.exports = {

  /**
   * CREATE
   */

  create: (book) => {
    const { title, genre, subgenre, publisher } = book
    return query(`INSERT INTO
            books (title, genre, subgenre, publisher)
          VALUES  ($1, $2, $3, $4)
          RETURNING *`, [title, genre, subgenre, publisher])
  },

  /**
   * READ
   */

  getAll: () =>
    query(`SELECT * FROM books`),

  getBy: (property, value) => {
    if (!property || !value)
      throw new Error('At books#getBy: Did not receive an arg.'+property+value)

    return query(`SELECT * FROM books WHERE ${property}=$1 ORDER BY id`, [value])
  },

  /**
   * UPDATE
   */

  update: (book) => {
    const { id, title, genre, subgenre, publisher } = book
    return query(`UPDATE books
      SET title = $1, genre = $2, subgenre = $3, publisher = $4
      WHERE id = $5  RETURNING *`,[ title, genre, subgenre, publisher, id ])
  },

  /**
    DESTROY
   */
   destroy: (id) =>
     query(`DELETE FROM books WHERE books.id=$1`, [id]),

  /**
    LINK AUTHOR
  */
  linkAuthor: (book_id, author_id) =>
    query(`INSERT INTO authors_books
             (book_id, author_id)
           VALUES
             ($1, $2)`, [book_id, author_id]),

  unlinkAllAuthors: (book_id) =>
    query(`DELETE FROM authors_books
          WHERE book_id = $1`,
          [book_id]),

  getAuthorsByBookId: (book_id) =>
    query(`SELECT authors.name FROM authors
           JOIN authors_books
           ON authors_books.author_id=authors.id
           WHERE authors_books.book_id=$1`, [book_id])

}
