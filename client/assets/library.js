'use strict';

const getAll = document.getElementById('all');
const getHorror = document.getElementById('horror');
const getScience = document.getElementById('science');
const getFiction = document.getElementById('fiction');
const getClassic = document.getElementById('classic');
const getFantasy = document.getElementById('fantasy');
const getChild = document.getElementById('child');

const books = document.getElementById('books');
const search = document.getElementById('search');
const searchInput = document.getElementById('search-input');
const modal = document.getElementById('modal');

// fetch all books and display

const getData = async () => {
  const res = await fetch('http://localhost:3000/library');
  const data = await res.json();

  displayAllBooks(data);
};

// Display all books

const displayAllBooks = (data) => {
  const allData = data.map((d) => {
    return `
    <div id='bookList' class="cursor-pointer flex flex-col justify-center items-center" data-id=${d.book_id}>
      <img class="w-full" src=${d.book_image} alt="book cover"/>
      <h2>${d.title}</h2>
      <p>${d.author}</p>
    </div>`;
  });

  books.innerHTML = allData.join('');

  const bookList = document.querySelectorAll('#bookList');
  bookList.forEach((book) => {
    book.addEventListener('click', async () => {
      const { id } = book.dataset;
      const res = await fetch(`http://localhost:3000/library/${id}`);
      const data = await res.json();

      displayModal(data);
    });
  });
};

// Filtering Logic

const filterBook = async (value) => {
  let buttons = document.querySelectorAll('#buttons button');
  buttons.forEach((button) => {
    if (value.toLowerCase() == button.innerText.toLowerCase()) {
      button.classList.add('active');
    } else {
      button.classList.remove('active');
    }
  });

  if (value === 'all') {
    let allButton = document.querySelector('#all');
    allButton.classList.add('active');
    getData();
    return;
  } else {
    const res = await fetch(`http://localhost:3000/library/category/${value}`);
    const data = await res.json();

    const filteredData = data.filter(
      (d) => d.category.toLowerCase() === value.toLowerCase()
    );
    displayFilteredBooks(filteredData);
  }
};

const displayFilteredBooks = (data) => {
  const allData = data.map((d) => {
    return `
  <div id='bookList' class="cursor-pointer" data-id=${d.book_id}>
  <img src=${d.book_image} alt="book cover"/>
    <h2 class="book-name">${d.title}</h2>
    <p>${d.author}</p>
  </div>`;
  });

  books.innerHTML = allData.join('');

  const bookList = document.querySelectorAll('#bookList');
  bookList.forEach((book) => {
    book.addEventListener('click', async () => {
      const { id } = book.dataset;
      const res = await fetch(`http://localhost:3000/library/${id}`);
      const data = await res.json();

      displayModal(data);
    });
  });
};

// Search Feature

search.addEventListener('click', async (e) => {
  let searchInput = document
    .getElementById('search-input')
    .value.trim()
    .toLowerCase();

  const res = await fetch(`http://localhost:3000/library`);
  const data = await res.json();

  const filteredData = data.filter((book) => {
    const title = book.title.toLowerCase();
    const ISBN = book.isbn;

    return title.includes(searchInput) || ISBN.includes(searchInput);
  });

  displaySearchedBooks(filteredData);
});

function displaySearchedBooks(data) {
  let filteredHTML = '';

  data.forEach((book) => {
    const bookHTML = `
      <div id='bookList' class="cursor-pointer" data-id=${book.book_id}>
        <img src=${book.book_image} alt="book cover"/>
        <h2 class="book-name">${book.title}</h2>
        <p>${book.author}</p>
      </div>
    `;

    filteredHTML += bookHTML;
  });

  books.innerHTML = filteredHTML;

  const bookList = document.querySelectorAll('#bookList');
  bookList.forEach((book) => {
    book.addEventListener('click', async () => {
      const { id } = book.dataset;
      const res = await fetch(`http://localhost:3000/library/${id}`);
      const data = await res.json();
      displayModal(data);
    });
  });
}

// Modal

const displayModal = (data) => {
  modal.innerHTML = `
  <div class="modal-content bg-white mx-auto p-5 border-2 border-slate-500 w-3/6 max-w-2xl relative">
          <img src='./circle-xmark.svg' class="close absolute top-0 right-0 p-3 cursor-pointer w-6 h-6"/>
          <div class="flex flex-col justify-center items-center">
          <img class="w-full" src=${data.book_image} alt="book cover"/>
           <h2>${data.title}</h2>
            <h4>${data.author}</h4>
            <button id="reserve-btn" class="py-2 px-6 bg-indigo-500 text-white">Reserve</button> 
          </div>
          
        </div>
  `;

  document.body.appendChild(modal);

  modal.style.display = 'block';

  const closeModal = modal.querySelector('.close');
  closeModal.addEventListener('click', () => {
    document.body.removeChild(modal);
  });
};

// Global functions

window.onload = () => {
  filterBook('all');
};

getAll.addEventListener('click', () => filterBook('all'));
getHorror.addEventListener('click', () => filterBook('Horror'));
getScience.addEventListener('click', () => filterBook('Science'));
getFiction.addEventListener('click', () => filterBook('Fiction'));
getClassic.addEventListener('click', () => filterBook('classic'));
getFantasy.addEventListener('click', () => filterBook('Fantasy'));
getChild.addEventListener('click', () => filterBook('Child'));
