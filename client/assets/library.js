'use strict';
const getAll = document.getElementById('all');
const getBook = document.getElementById('book');
const getScience = document.getElementById('science');
const getFiction = document.getElementById('fiction');
const getNonFiction = document.getElementById('non-fiction');
const getAdult = document.getElementById('adult');
const getChild = document.getElementById('child');

const books = document.getElementById('books');
const search = document.getElementById('search');

const getData = async () => {
  const res = await fetch('http://localhost:3000/library');
  const data = await res.json();

  displayAllBooks(data);
};

const displayAllBooks = (data) => {
  const allData = data.map((d) => {
    return `
    <div id='bookList' class="cursor-pointer" data-id=${d.book_id}>
      <h2>${d.title}</h2>
      <p>${d.author}</p>
    </div>`;
  });
  books.innerHTML = allData.join('');
};

getData();

const filterBook = async (value) => {
  let buttons = document.querySelectorAll('#buttons button');
  buttons.forEach((button) => {
    if (value.toLowerCase() == button.innerText.toLowerCase()) {
      button.classList.add('active');
    } else {
      button.classList.remove('active');
    }
  });

  if (value === 'All') {
    let allButton = document.querySelector('#all');
    allButton.classList.add('active');
    getData();
  } else {
    const res = await fetch(`http://localhost:3000/library/category/${value}`);
    const data = await res.json();
    console.log(data);

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
    <h2 class="book-name">${d.title}</h2>
    <p>${d.author}</p>
  </div>`;
  });

  books.innerHTML = allData.join('');
};

getAll.addEventListener('click', () => filterBook('All'));
getBook.addEventListener('click', () => filterBook('Book'));
getScience.addEventListener('click', () => filterBook('science'));
getFiction.addEventListener('click', () => filterBook('Fiction'));
getNonFiction.addEventListener('click', () => filterBook('Non-Fiction'));
getAdult.addEventListener('click', () => filterBook('Adult'));
getChild.addEventListener('click', () => filterBook('Child'));

window.onload = () => {
  filterBook('all');
};

search.addEventListener('click', () => {
  console.log('button clicked');
  let searchInput = document.getElementById('search-input').value.trim();

  let filteredHTML = '';

  let cards = document.querySelectorAll('#bookList');

  cards.forEach(async (card) => {
    const title = card.innerText.toLowerCase();

    if (title.includes(searchInput.toLowerCase())) {
      console.log(`search includes ${searchInput}`);
      const res = await fetch(
        `http://localhost:3000/library/title/${encodeURIComponent(searchInput)}`
      );
      const data = await res.json();
      console.log(data);

      const bookHTML = `<div id='bookList' class="cursor-pointer" data-id=${data.book_id}>
        <h2 class="book-name">${data.title}</h2>
        <p>${data.author}</p>
      </div>`;

      filteredHTML += bookHTML;

      books.innerHTML = filteredHTML;
    }
  });
});
