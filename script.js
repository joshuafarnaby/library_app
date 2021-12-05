const addBookBtn = document.querySelector('.add-book-button');
const addBookModal = document.querySelector('.modal-container');
const cancelAddBookBtn = document.querySelector('#cancel');


function showAddBookModal() {
  addBookModal.style.display = 'flex';
}

function hideAddBookModal() {
  // clear all inputs
  addBookModal.style.display = 'none';
}

addBookBtn.addEventListener('click', showAddBookModal)
cancelAddBookBtn.addEventListener('click', hideAddBookModal)