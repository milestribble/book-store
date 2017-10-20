const fs = require('fs')

let jsondata = fs.readFileSync('booksold.json','utf-8')

jsondata = JSON.parse(jsondata)

const getRandomNumberBetween = (low, high) => {
  let range = high - low

  return ( low + Math.floor(Math.random() * range) );
}

let newEl = jsondata.map(el=>{
  console.log(el);
  let newEl = {}
  newEl.title = el.book.title
  newEl.image_url =el.book.image_url
  newEl.isbn =el.book.isbn
  newEl.description =el.book.description
  newEl.author = el.book.authors.author.name
  newEl.price = getRandomNumberBetween(2.75,50)

  return newEl
})

fs.writeFile('books.json',JSON.stringify(newEl))
