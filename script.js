const addBookBtn = document.querySelector('.add-book-button');
const addBookModal = document.querySelector('.modal-container');

const inputFields = document.querySelectorAll('.new-book');
const cancelAddBookBtn = document.querySelector('#cancel');
const submitNewBookBtn = document.querySelector('#submit');

const books = [];

function Book(title, author, pages, haveRead) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.haveRead = haveRead;
}

function handleNewBookSubmission(e) {
  e.preventDefault();
  let inputFieldValues = getCurrentInputValues()
  books.push(new Book(...inputFieldValues))
  hideAddBookModal()
  
  if (books.length == 0) {
    return
  } else {
    displayBooks()
  }
}

function displayBooks() {

  console.log('new book');
  let newCard = document.createElement('div');

  newCard.innerHTML = `
    <div class="card-header">${books[books.length - 1].title}</div>
    <div class="info-container">
      <p>Author: ${books[books.length -1].author}</p>
      <p>Length: ${books[books.length - 1].pages} pages</p>
      <p>${books[books.length - 1].haveRead ? 'Has read' : 'To read'}</p>
    </div>`

  newCard.classList.add('card')

  document.querySelector('.card-container').appendChild(newCard);
}

function getCurrentInputValues() {
  let values;

  values = [...inputFields].map(field => {
    if (field.type == "range") {
      return field.value == '1' ? false : true
    } else {
      return field.value
    }
  });

  return values;
}

function showAddBookModal() {
  addBookModal.style.display = 'flex';
}

function hideAddBookModal() {
  inputFields.forEach(input => {
    if (input.type == 'text') input.value = '';
  })

  addBookModal.style.display = 'none';
}

addBookBtn.addEventListener('click', showAddBookModal);
submitNewBookBtn.addEventListener('click', handleNewBookSubmission);
cancelAddBookBtn.addEventListener('click', (e) => {
  e.preventDefault();
  hideAddBookModal();
});

// let newCard = document.createElement('div');

// newCard.innerHTML = `
//   <div class="card-header">${books[1].title}</div>
//   <div class="info-container">
//     <p>Author: ${books[1].author}</p>
//     <p>Length: ${books[1].pages} pages</p>
//     <p>${books[1].haveRead ? 'Has read' : 'To read'}</p>
//   </div>

  
// `
// newCard.classList.add('card')



// document.querySelector('.card-container').appendChild(newCard);