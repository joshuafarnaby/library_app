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

  let inputFieldValues = getCurrentInputValues();
  let newBook = new Book(...inputFieldValues);

  books.push(newBook);
  displayBookCard(newBook);

  hideAddBookModal();
}

function displayBookCard(bookObj) {
  let newBookCard = generateNewBookCard(bookObj)

  document.querySelector('.card-container').appendChild(newBookCard)
}

function changeReadStatus(index, textToEdit, buttonToEdit) {
  let bookToEdit = books[index];
  bookToEdit.haveRead = !bookToEdit.haveRead;
  textToEdit.textContent = bookToEdit.haveRead ? 'Has read' : 'Not read';
  buttonToEdit.textContent = bookToEdit.haveRead ? 'not read' : 'read';
}

function generateNewBookCard(bookObj) {
  let bookTitle = bookObj.title ? bookObj.title : 'unknown';
  let bookAuthor = bookObj.author ? bookObj.author : 'unknown';
  let bookPages = bookObj.pages ? bookObj.pages : 'unknown';
  let readStatus = bookObj.haveRead ? 'Has read' : 'To read';

  let dataIndex = books.indexOf(bookObj)

  let newCard = document.createElement('div')
  newCard.classList.add('card');
  newCard.setAttribute('data-index', dataIndex)

  newCard.innerHTML = `
    <div class="card-header">
      <button class="remove-book-btn">X</button>
      <h3>${bookTitle}</h3>
    </div>
    <div class="info-container">
      <p>Author: ${bookAuthor}</p>
      <p>Length: ${bookPages} pages</p>
      <div class="has-read-container">
        <p>${readStatus}</p>
        <button class="change-read-status">${bookObj.haveRead ? 'not read' : 'read'}</button>
      </div>
    </div>`

  return newCard
}

function getCurrentInputValues() {
  let values = [...inputFields].map(field => {
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

function hideAddBookModal(e = null) {
  if (e) e.preventDefault();

  inputFields.forEach(input => {
    if (input.type == 'text') input.value = '';
  });

  addBookModal.style.display = 'none';
}

submitNewBookBtn.addEventListener('click', handleNewBookSubmission);
addBookBtn.addEventListener('click', showAddBookModal);
cancelAddBookBtn.addEventListener('click', hideAddBookModal);

document.addEventListener('click', (e) => {
  if (e.target && e.target.classList.contains('change-read-status')) {
    let index = e.target.parentElement.parentElement.parentElement.getAttribute('data-index');
    let textToEdit = e.target.previousElementSibling;
    let buttonToEdit = e.target;

    changeReadStatus(index, textToEdit, buttonToEdit);
  }
})

document.addEventListener('click', (e) => {
  if (e.target && e.target.classList.contains('remove-book-btn')) {
    let cardToRemove = e.target.parentElement.parentElement;
    let index = cardToRemove.getAttribute('data-index');

    document.querySelector('.card-container').removeChild(cardToRemove);
    books.splice(index, 1);

    let nextElement = document.querySelector('.card-container').firstElementChild
    
    books.forEach((book, idx) => {
      if (!nextElement) return;

      nextElement.setAttribute('data-index', idx)
      nextElement = nextElement.nextElementSibling;
    })
  }
})