const addBookBtn = document.querySelector('.add-book-button');
const addBookModal = document.querySelector('.modal-container')


function showAddBookModal() {
  addBookModal.style.display = 'flex';
}

addBookBtn.addEventListener('click', showAddBookModal)