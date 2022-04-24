/* eslint-disable max-classes-per-file */
/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
const bookStore = document.querySelector('.book-store');
const form = document.getElementById('form');

class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }
}

let defaultBooks = JSON.parse(localStorage.getItem('books')) || [];

class UI {
  static displayBooks() {
    defaultBooks.forEach((book) => UI.addBookToList(book));
  }

  static addBookToList(book) {
    const bookStore = document.querySelector('.book-store');
    const div = document.createElement('div');
    div.classList.add('book-container');

    div.innerHTML = `
    <span class='book-title'>${book.title}</span> by <span class='book-author'>${book.author}</span>
    <button class="delete">Remove</button>`;

    bookStore.appendChild(div);
  }

  static clearFields() {
    const title = document.getElementById('title');
    const author = document.getElementById('author');

    title.value = '';
    author.value = '';
  }

  static deleteBook(target) {
    if (target.classList.contains('delete')) {
      target.parentNode.remove();
    }
    const filteredTitle =
      target.previousElementSibling.previousElementSibling.textContent;

    defaultBooks = defaultBooks.filter((book) => {
      if (book.title !== filteredTitle) {
        return true;
      }
    });
  }

  static changeColor(target) {
    let colors = localStorage.getItem('color') || [
      {
        body: '#7c2121',
        header: '#b8a157',
        footer: '#b8a157',
        headerDate: '#b8a157',
        bookStore: '#b8a157',
      },
    ];
    if (target.classList.contains('red')) {
      body.style.backgroundColor = '#7c2121';
      header.style.backgroundColor = '#b8a157';
      footer.style.backgroundColor = '#b8a157';
      headerDate.style.color = '#b8a157';
      bookStore.style.backgroundColor = '#b8a157';
      colors.push({
        body: '#7c2121',
        header: '#b8a157',
        footer: '#b8a157',
        headerDate: '#b8a157',
        bookStore: '#b8a157',
      });
    } else if (target.classList.contains('blue')) {
      body.style.backgroundColor = '#1818f5';
      header.style.backgroundColor = '#e0974d';
      footer.style.backgroundColor = '#e0974d';
      headerDate.style.color = '#e0974d';
      bookStore.style.backgroundColor = '#e0974d';
    } else if (target.classList.contains('beige')) {
      body.style.backgroundColor = '#ececc5';
      header.style.backgroundColor = '#cec5ec';
      footer.style.backgroundColor = '#cec5ec';
      headerDate.style.color = '#800080';
      bookStore.style.backgroundColor = '#cec5ec';
    } else if (target.classList.contains('green')) {
      body.style.backgroundColor = '#81bd81';
      header.style.backgroundColor = '#bdbd81';
      footer.style.backgroundColor = '#bdbd81';
      headerDate.style.color = '#bd8181';
      bookStore.style.backgroundColor = '#bdbd81';
    } else if (target.classList.contains('purple')) {
      body.style.backgroundColor = '#815d81';
      header.style.backgroundColor = '#5d816f';
      footer.style.backgroundColor = '#5d816f';
      headerDate.style.color = '#5d8181';
      bookStore.style.backgroundColor = '#5d816f';
    }
  }
}

UI.displayBooks();

function addBook(e) {
  e.preventDefault();

  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;

  if (title === '' || author === '') {
    return;
  }

  const book = new Book(title, author);

  defaultBooks.push(book);
  localStorage.setItem('books', JSON.stringify(defaultBooks));

  UI.addBookToList(book);

  UI.clearFields();
}

form.addEventListener('submit', addBook, false);

function hanldRemove(e) {
  UI.deleteBook(e.target);
  localStorage.setItem('books', JSON.stringify(defaultBooks));
}

bookStore.addEventListener('click', hanldRemove);

const headerDate = document.querySelector('.header-date');
headerDate.innerHTML = Date();

const bookSection = document.querySelector('.book-section');
const addBookSection = document.querySelector('.add-section');
const contactSection = document.querySelector('.contact-section');

const linkList = document.querySelector('.list');
const AddNewLink = document.querySelector('.add');
const contactLink = document.querySelector('.contact');

linkList.addEventListener('click', () => {
  bookSection.style.display = 'block';
  addBookSection.style.display = 'none';
  contactSection.style.display = 'none';
  linkList.style.color = 'blue';
  AddNewLink.style.color = 'black';
  contactLink.style.color = 'black';
});

AddNewLink.addEventListener('click', () => {
  bookSection.style.display = 'none';
  addBookSection.style.display = 'flex';
  contactSection.style.display = 'none';
  AddNewLink.style.color = 'blue';
  linkList.style.color = 'black';
  contactLink.style.color = 'black';
});

contactLink.addEventListener('click', () => {
  bookSection.style.display = 'none';
  addBookSection.style.display = 'none';
  contactSection.style.display = 'block';
  contactLink.style.color = 'blue';
  AddNewLink.style.color = 'black';
  linkList.style.color = 'black';
});

const body = document.querySelector('body');
const header = document.querySelector('.header-nav');
const footer = document.querySelector('footer');
const color = document.querySelectorAll('.color').forEach((color) =>
  color.addEventListener('click', (e) => {
    UI.changeColor(e.target);
    localStorage.setItem('color', JSON.stringify(colors));
  })
);
