const addBookBtn = document.querySelector('.add-book-button');
const addBookModal = document.querySelector('.modal-container');

const inputFields = document.querySelectorAll('.new-book');
const cancelAddBookBtn = document.querySelector('#cancel');
const submitNewBookBtn = document.querySelector('#submit');

const books = [];

window.onload = function() {
  let index = 0;
  let item;

  while(window.localStorage.getItem(index)) {
    item = window.localStorage.getItem(index);
    books.push(JSON.parse(item));
    index++;
  }
  
  books.forEach(book => displayBookCard(book))
}

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
  window.localStorage.setItem(books.indexOf(newBook), JSON.stringify(newBook))
  hideAddBookModal();
}

function displayBookCard(bookObj) {
  let newBookCard = generateNewBookCard(bookObj)

  document.querySelector('.card-container').appendChild(newBookCard)
}

function changeReadStatus(index, textToEdit, buttonToEdit) {
  let bookToEdit = books[index];
  bookToEdit.haveRead = !bookToEdit.haveRead;
  textToEdit.textContent = bookToEdit.haveRead ? 'Read' : 'Unread';
  buttonToEdit.textContent = bookToEdit.haveRead ? 'unread' : 'read';

  window.localStorage.setItem(index, JSON.stringify(bookToEdit));
}

function generateNewBookCard(bookObj) {
  let bookTitle = bookObj.title ? bookObj.title : 'unknown';
  let bookAuthor = bookObj.author ? bookObj.author : 'unknown';
  let bookPages = bookObj.pages ? bookObj.pages : 'unknown';
  let readStatus = bookObj.haveRead ? 'Read' : 'Unread';

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
        <button class="change-read-status">${bookObj.haveRead ? 'unread' : 'read'}</button>
      </div>
    </div>`

  return newCard
}

function updateDataIndexAttributes() {
  let nextElement = document.querySelector('.card-container').firstElementChild
    
  books.forEach((book, idx) => {
    if (!nextElement) return;

    nextElement.setAttribute('data-index', idx)
    nextElement = nextElement.nextElementSibling;
  })
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

function updateLocalStorage() {
  window.localStorage.clear();

  books.forEach((book, idx) => window.localStorage.setItem(idx, JSON.stringify(book)));
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

    updateDataIndexAttributes();
    updateLocalStorage();
  }
})