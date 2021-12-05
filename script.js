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
  console.log(books);
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
