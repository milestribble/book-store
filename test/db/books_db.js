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

/**
 * UPDATE
 */
describe(``, function() {


  it(``, function() {

  })

})







/**
 * DESTROY
 */



/*


describe(``, function() {

  it(``, function() {

  })

})

*/
