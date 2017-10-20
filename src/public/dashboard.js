document.addEventListener('DOMContentLoaded', () => {
  renderBooks()
})

//How to know which user is signed in  ? Admin or Regular

const renderBooks = () => fetch('/api/books', {
  credentials: "same-origin"
})
// .then(response => {
//
//   return response
// })
.then(response => response.json()
  .then(books => {
    books.forEach(book => {
      let title = book.title
      console.log(response.headers)
      let newBook = document.querySelector('#templates').querySelector('.book').cloneNode(true)

      newBook.querySelector('.title').innerText = title
      newBook.querySelector('.btn').addEventListener('click', function() {

        alert(`I should be the edit window for id: ${this.book.id}`)
        newBook.remove()
      })
      // newBook.querySelector('.editbtn').book = book

      document.querySelector(`#holder`).appendChild(newBook)

      // let li = document.createElement('li')
      // li.innerHTML =
      // `<div class='templates'>
      //   <div class="book col-lg-4 col-md-4">
      //     <div class="thumbnail">
      //       <img src="http://pngimg.com/uploads/book/book_PNG2111.png">
      //       <div class="caption">
      //         <h4>
      //           ${title}
      //         </h4>
      //         <button class="btnbtn">Edit</button>
      //       </div>
      //     </div>
      //   </div>
      // </div>`
      //
      //  document.querySelector(`#holder`).appendChild(li)
      //
      // document.addEventListener('click', function() {
      //   alert('Ive been clicked')
      // })
      //
    })

  })
)



const renderEditModal = () => {

}


/*

  We have out api setup to create read update and delete books

  First render login page.. After that,

  1) Display all books in the grid.
       Hovering over the book will show EDIT and DELETE buttons if admin
       Hovering over the book will show See More.. and Add To Cart if regular

  2) Clicking on "EDIT" on a button will bringup a modal with pre populated info
     of the book

  3) Clicking on add to cart will add the book to the cart

  3) Clicking on delete will remove the book from db and browser



 */


// const returnForm = () => {
//
// }
