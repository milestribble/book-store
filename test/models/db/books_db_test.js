const books = require('../../src/models/db/books_db.js')
const { expect } = require('chai')
const { query } = require('../../src/models/db/client.js')

beforeEach(function() {
  return query(`TRUNCATE table books RESTART IDENTITY CASCADE`)
  .then(() =>
    books.create({
      title: 'Let Us C',
      genre: 'Programming',
      subgenre: 'C',
      publisher: 'MIT'
      })
  )
  .then(() =>
    books.create({
      title: 'Ruby',
      genre: 'Programming',
      subgenre: 'WebDev',
      publisher: 'SF'
      })
  )
})

/**
 * CREATE
 */

describe(`books#create`, function() {


  it(`It returns a new book in the database`, function() {
    return books.create({
      title: 'New York Times',
      genre: 'News',
      subgenre: 'NationalNews',
      publisher: 'NYC'
    })
    .then(() =>
      query(`SELECT * FROM books WHERE title='New York Times'`)
    )
    .then(results => {
      expect(results[0].title).to.equal('New York Times')
    })
  })

  it(`It creates a book obj`, function() {
    return books.create({
      title: 'New York Times',
      genre: 'News',
      subgenre: 'NationalNews',
      publisher: 'NYC'
    })
    .then(results => {
      expect(results[0].title).to.equal('New York Times')
    })
  })

})


/**
 * READ
 */
describe(`books#getAll`, function() {

  it(`Returns all the books`, function() {
    return books.getAll()
    .then(results => {
      expect(results.length).to.equal(2)
      let titles = results.map(obj => obj.title)
      expect(titles).to.include('Ruby', 'Let Us C')
    })

  })

})


describe(`books#getBy`, function() {

  it(`gets a book by its id`, function() {
    return books.getBy('id', 1)
    .then(results => {
      expect(results[0].title).to.equal('Let Us C')
    })
  })

  it(`gets a book by its title`, function() {
    return books.getBy('title', 'Let Us C')
    .then(results => {
      expect(results[0].title).to.equal('Let Us C')
    })
  })
})

/**
 * UPDATE
 */
describe(`books#upate`, function() {


  it(`Updates the information for a book`, function() {
    return books.update({
      id: 1,
      title: 'Let Us C++',
      genre: 'Programming',
      subgenre: 'C++',
      publisher: 'Stanford'
      })
      .then(() =>
        query(`SELECT * FROM books WHERE id=1`)
      )
      .then(results => {
        expect(results[0].title).to.equal('Let Us C++')
      })
  })

  it(`Return the book obj`, function() {
    return books.update({
      id: 1,
      title: 'Let Us C++',
      genre: 'Programming',
      subgenre: 'C++',
      publisher: 'Stanford'
      })
      .then(results => {
        expect(results[0].title).to.equal('Let Us C++')
      })
  })

})

/**
 * DESTROY
 */
describe(`books#destroy`, function() {

  it(`Deletes a book for a given id`, function() {
    return books.destroy(1)
    .then(() =>
      query(`SELECT * FROM books`)
    )
    .then((results) => {
      expect(results.length).to.equal(1)
    })
  })

})


/**
  LINK AUTHOR
*/

describe(`books#linkAuthor`, function() {

  beforeEach(function() {
    return query(`INSERT INTO authors
                    (name)
                  VALUES
                    ('Charles Darwin'),
                    ('Albert Einstien')`
                )
  })

  it(`Links an author_id to a given book_id`, function() {
    return books.linkAuthor(1, 1)
    .then(() =>
      query(`SELECT * FROM authors_books WHERE book_id = 1 AND author_id=1`)
    )
    .then(results => {
      expect(results[0].book_id).to.equal(1)
      expect(results[0].author_id).to.equal(1)
    })
  })

})

describe(`books#unlinkAuthor`, function() {

  beforeEach(function() {
    return query(`INSERT INTO authors
                    (name)
                  VALUES
                    ('Charles Darwin'),
                    ('Albert Einstien')`
                )
          .then(() =>
            query(`INSERT INTO authors_books
                   (book_id, author_id)
                 VALUES
                   (1, 1)`))
  })

  it(`Unlinks an author_id to a given book_id`, function() {
    return books.unlinkAllAuthors(1)
      .then(() =>
        query(`SELECT * FROM authors_books WHERE book_id = 1`)
      )
      .then(results => {
        expect(results.length).to.equal(0)
      })
  })

})
