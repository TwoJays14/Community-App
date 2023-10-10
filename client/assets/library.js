'use strict';
const getAll = document.getElementById('all');
const getBook = document.getElementById('book');
const getScience = document.getElementById('science');
const getFiction = document.getElementById('fiction');
const getNonFiction = document.getElementById('non-fiction');
const getAdult = document.getElementById('adult');
const getChild = document.getElementById('child');

const books = document.getElementById('books');

const getData = async () => {
  const res = await fetch('http://localhost:3000/library');
  const data = await res.json();
  console.log(data);

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

const filterBook = async (value) => {
  let buttons = document.querySelectorAll('#buttons button');
  buttons.forEach((button) => {
    if (value.toUpperCase() == button.innerText.toUpperCase()) {
      button.classList.add('active');
    } else {
      button.classList.remove('active');
    }
  });

  const res = await fetch(`http://localhost:3000/library/category/${value}`);
  const data = await res.json();
  console.log(data);

  let elements = document.querySelectorAll('#bookList');
  console.log(elements);

  elements.forEach((el) => {
    if (value == 'all') {
      el.classList.remove('hide');
    } else {
      if (el.classList.contains(value)) {
        el.classList.remove('hide');
      } else {
        el.classList.add('hide');
      }
    }
  });
};

getAll.addEventListener('click', () => {
  filterBook('all');
});
getBook.addEventListener('click', () => filterBook('Book'));
getScience.addEventListener('click', () => filterBook('science'));
getFiction.addEventListener('click', () => filterBook('Fiction'));
getNonFiction.addEventListener('click', () => filterBook('Non-Fiction'));
getAdult.addEventListener('click', () => filterBook('Adult'));
getChild.addEventListener('click', () => filterBook('Child'));

window.onload = () => {
  filterBook('All');
};
