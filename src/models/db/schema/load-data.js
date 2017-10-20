const fs = require('fs')
const books = require('../books_db')
const path = require('path')
let jsondata = fs.readFileSync(path.resolve(__dirname,'books.json'),'utf-8')
jsondata = JSON.parse(jsondata)
jsondata.forEach(book => {
  books.create(book)
    .then((newBook) =>
      books.createAuthor(book)
        .then(newAuthor =>
          books.linkAuthor(newBook[0].id,newAuthor[0].id))

      )
})
