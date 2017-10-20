const { query } = require('./client.js')

module.exports = {

  /**
   * CREATE
   */

  create: (book) => {
    const { title, image_url, isbn, price, description } = book
    return query(`INSERT INTO
            books (title, image_url, isbn, price, description)
          VALUES  ($1, $2, $3, $4, $5)
          RETURNING *`, [title, image_url, isbn, price, description])
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
    const { title, image_url, isbn, price, description, id } = book
    return query(`UPDATE books
      SET title = $1, image_url = $2, isbn = $3, price = $4, description = $5
      WHERE id = $6  RETURNING *`,[ title, image_url, isbn, price, description, id])
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
           WHERE authors_books.book_id=$1`, [book_id]),

  createAuthor: (book) =>
    query(`INSERT INTO authors (name) VALUES ($1) RETURNING id`,[book.author])
}
