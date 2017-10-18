const users = require('../../src/models/db/users_db.js')
const { expect } = require('chai')
const { query } = require('../../src/models/db/client.js')

/**
 * CREATE
 */
describe(`users#create`, function() {

  beforeEach(function() {
    return query(`TRUNCATE table users RESTART IDENTITY`)
  })

  it(`Creates a new user in the database`, function() {
    return users.create('Bob', 'bob@gmail.com', 'dsfasdf', 'admin')
    .then(() =>
      query(`SELECT * FROM users WHERE email='bob@gmail.com'`)
    )
    .then(results => {
      expect(results.length).to.equal(1)
      expect(results[0].name).to.equal('Bob')
    })
  })

  it(`Returns a user object`, function() {
    return users.create('Bob', 'bob@gmail.com', 'dsfasdf', 'admin')
    .then(results =>{
      expect(results.length).to.equal(1)
      expect(results[0].name).to.equal('Bob')
    })
  })

})


/**
 * READ
 */

describe(`users#getAll`, function() {

  beforeEach(function() {
    return query(`TRUNCATE table users RESTART IDENTITY`)
    .then(() =>
      users.create('Alex','alex@gmail.com', 'dsfgsfgfdg', 'member')
    )
    .then(() =>
      users.create('Json','json@gmail.com', 'dsfgsfgfdg', 'member')
    )
  })

  it(`Returns all the users from the users table`, function() {
    return users.getAll()
    .then((results) => {
      expect(results.length).to.equal(2)
      let names = results.map(result => result.name)
      expect(names).to.include('Alex', 'Json')
    })
  })

})


describe(`users#getBy`, function() {

  beforeEach(function() {
    return query(`TRUNCATE table users RESTART IDENTITY`)
    .then(() =>
      users.create('Alex','alex@gmail.com', 'dsfgsfgfdg', 'member')
    )
    .then(() =>
      users.create('Json','json@gmail.com', 'dsfgsfgfdg', 'member')
    )
  })

  it(`Should throw an error if both args are not provided`, function() {
    expect(users.getBy).to.throw('Did not receive')
  })

  it(`Should find a user by their id`, function() {
    return users.getBy('id', 1)
      .then(results => {
        expect(results[0].name).to.equal('Alex')
      })
  })

  it(`Should find a user by their email`, function() {
    return users.getBy('email','json@gmail.com')
      .then(results => {
        expect(results[0].name).to.equal('Json')
      })
  })


})

/**
 * UPDATE
 */
describe(`users#update`, function() {

  beforeEach(function() {
    return query(`TRUNCATE table users RESTART IDENTITY`)
    .then(() =>
      users.create('Alex','alex@gmail.com', 'dsfgsfgfdg', 'member')
    )
    .then(() =>
      users.create('Json','json@gmail.com', 'dsfgsfgfdg', 'member')
    )
  })

  it(`Edits user detail for a given user id`, function() {
    return users.update({
      id: 1,
      name: 'Bob',
      email: 'bob@gmail.com',
      encrypted_password: 'dsfasdf',
      role: 'admin' })
      .then(() =>
        users.getBy('id', 1)
      )
      .then(results => {
        expect(results[0].name).to.equal('Bob')
      })
  })

  it(`Returns user detail for a given user id`, function() {
      return users.update({
        id: 1,
        name: 'Bob',
        email: 'bob@gmail.com',
        encrypted_password: 'dsfasdf',
        role: 'admin' })
        .then(results => {
          expect(results[0].name).to.equal('Bob')
        })
    })

})
/**
 * DESTROY
 */

 describe(`users#destroy`, function() {

   beforeEach(function() {
     return query(`TRUNCATE table users RESTART IDENTITY`)
     .then(() =>
       users.create('Alex','alex@gmail.com', 'dsfgsfgfdg', 'member')
     )
     .then(() =>
       users.create('Json','json@gmail.com', 'dsfgsfgfdg', 'member')
     )
   })

   it(`Deletes the user for given id`, function() {
     return users.destroy(1)
      .then(() =>
        query("SELECT * FROM users WHERE id = 1")
      )
      .then(results =>
        expect(results.length).to.equal(0)
      )

   })

 })
 
