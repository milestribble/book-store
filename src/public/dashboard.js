document.addEventListener('DOMContentLoaded', () => {
  renderBooks()


})

const renderBooks = () => fetch('/api/books')
.then(response => response.json())
.then(books => {
  books.forEach(book => {
    let title = book.title

    let newBook = document.querySelector('#templates').querySelector('.book').cloneNode(true)

    newBook.querySelector('.title').innerText = title
    newBook.querySelector('.editbtn').addEventListener('click', function() {
      alert(`I should be the edit window for id: ${this.book.id}`)
    })
    newBook.querySelector('.editbtn').book = book

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

const renderEditModal = () => {
  
}
