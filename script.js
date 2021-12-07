const addBookBtn = document.querySelector('.add-book-button');
const addBookModal = document.querySelector('.modal-container');

const inputFields = document.querySelectorAll('.new-book');
const cancelAddBookBtn = document.querySelector('#cancel');
const submitNewBookBtn = document.querySelector('#submit');

const cardContainer = document.querySelector('.card-container');

const books = [];

window.onload = function() {
  let index = 0;
  let item;

  while(window.localStorage.getItem(index)) {
    item = JSON.parse(window.localStorage.getItem(index));

    books.push(new Book(...item));
    index++;
  }
  
  books.forEach(book => book.displayBook())
}

function Book(title, author, pages, haveRead) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.haveRead = haveRead;
}

Book.prototype.createBookHTML = function() {
  let title = this.title ? this.title : 'unknow';
  let author = this.author ? this.author : 'uknown';
  let pages = this.pages ? this.pages : 'unknown';
  let haveRead = this.haveRead ? 'Read' : 'Unread';

  let dataIndex = books.indexOf(this);

  let newCard = document.createElement('div');
  newCard.classList.add('card');
  newCard.setAttribute('data-index', dataIndex);

  newCard.innerHTML = `
    <div class="card-header">
      <button class="remove-book-btn">X</button>
      <h3>${title}</h3>
    </div>
    <div class="info-container">
      <p>Author: ${author}</p>
      <p>Length: ${pages} pages</p>
      <div class="has-read-container">
        <p>${haveRead}</p>
        <button class="change-read-status">${this.haveRead ? 'unread' : 'read'}</button>
      </div>
    </div>`

  return newCard
}

Book.prototype.displayBook = function() {
  let bookHTML = this.createBookHTML();
  cardContainer.appendChild(bookHTML);
}

Book.prototype.valuesToArray = function() {
  let valuesArray = [];

  for (let key in this) {
    valuesArray.push(this[key]);
  }

  return valuesArray;
}

Book.prototype.saveToLocalStorage = function() {
  let arrayOfValues = this.valuesToArray();
  let indexOfBook = books.indexOf(this);
  window.localStorage.setItem(indexOfBook, JSON.stringify(arrayOfValues));
}

Book.prototype.removeFromArray = function(array) {
  if (array.indexOf(this) == -1) return;
  array.splice(books.indexOf(this), 1)
}

Book.prototype.changeReadStatus = function() {
  this.haveRead = !this.haveRead;
}

function handleNewBookSubmission(e) {
  e.preventDefault();

  let inputFieldValues = getCurrentInputValues();
  let newBook = new Book(...inputFieldValues);

  books.push(newBook);
  newBook.displayBook();
  newBook.saveToLocalStorage();

  hideAddBookModal();
}

function changeReadStatusOnCard(textToEdit, buttonToEdit) {
  textToEdit.textContent = textToEdit.textContent == 'Unread' ? 'Read' : 'Unread';
  buttonToEdit.textContent = buttonToEdit.textContent == 'read' ? 'unread' : 'read';
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

  books.forEach((book) => {
    book.saveToLocalStorage();
  })
}

submitNewBookBtn.addEventListener('click', handleNewBookSubmission);
addBookBtn.addEventListener('click', showAddBookModal);
cancelAddBookBtn.addEventListener('click', hideAddBookModal);

document.addEventListener('click', (e) => {
  if (e.target && e.target.classList.contains('change-read-status')) {
    let index = e.target.parentElement.parentElement.parentElement.getAttribute('data-index');
    let bookToEdit = books[index]
    let textToEdit = e.target.previousElementSibling;
    let buttonToEdit = e.target;

    bookToEdit.changeReadStatus();
    bookToEdit.saveToLocalStorage();
    changeReadStatusOnCard(textToEdit, buttonToEdit);
  }
})

document.addEventListener('click', (e) => {
  if (e.target && e.target.classList.contains('remove-book-btn')) {
    let cardToRemove = e.target.parentElement.parentElement;
    let index = cardToRemove.getAttribute('data-index');
    let targetBook = books[index];

    cardContainer.removeChild(cardToRemove);
    targetBook.removeFromArray(books);

    updateDataIndexAttributes();
    updateLocalStorage();
  }
})