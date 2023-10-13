'use strict';

const getAll = document.getElementById('all');
const getNature = document.getElementById('nature');
const getScience = document.getElementById('science');
const getFiction = document.getElementById('fiction');
const getPhilosophy = document.getElementById('philosophy');
const getFantasy = document.getElementById('fantasy');
const getHistory = document.getElementById('history');

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
      <img class="w-full object-cover" src=${d.book_image} alt="book cover"/>
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
  <img class="object-cover w-full" src=${d.book_image} alt="book cover"/>
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
search.addEventListener('click', async () => {
  let searchInput = document.getElementById('search-input').value.trim();

  const res = await fetch(`http://localhost:3000/library`);
  const data = await res.json();

  const filteredData = data.filter((book) => {
    const title = (book.title || '').toLowerCase();
    const author = (book.author || '').toLowerCase();

    return title.includes(searchInput) || author.includes(searchInput);
  });

  displaySearchedBooks(filteredData);
});

// Live Search Feature

searchInput.addEventListener('input', async (e) => {
  const searchValue = e.target.value.trim().toLowerCase();

  const res = await fetch(`http://localhost:3000/library/`);
  const data = await res.json();

  const filteredData = data.filter((book) => {
    const title = (book.title || '').toLowerCase();
    const author = (book.author || '').toLowerCase();

    return title.includes(searchValue) || author.includes(searchValue);
  });

  displaySearchedBooks(filteredData);
});

function displaySearchedBooks(data) {
  let filteredHTML = '';

  data.forEach((book) => {
    const bookHTML = `
      <div id='bookList' class="cursor-pointer" data-id=${book.book_id}>
        <img class="sm: w-1/8 xl:w-3/6 2xl:w-1/6 object-cover" src=${book.book_image} alt="book cover"/>
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
  <div class="modal-content flex flex-col   bg-white mx-auto p-4 border-2 border-slate-500 max-w-2xl relative">
          <img src='./circle-xmark.svg' class="close absolute top-0 right-0 p-3 cursor-pointer w-6 h-6"/>
          <div class="flex flex-col ">
          <img class="w-3/6 mx-auto object-cover" src=${
            data.book_image
          } alt="book cover"/>

          <div class="flex flex-col items-center">
            <h2 class="font-bold">Book Title</h2>
            <p>${data.title}</p>
           </div>

           <div class="flex flex-col items-center">
            <h2 class="font-bold">Author</h2>
            <p>${data.author}</p>
            </div>

           <div class="flex flex-col items-center">
            <h2 class="font-bold">Description</h2>
            <p>${data.book_description}</p>
            </div>

            <div class="flex justify-around items-center">

            <div class="flex flex-col  items-center">
            <h2 class="font-bold">Category</h2>
            <p>${data.category}</p>
            </div>
            
            <div class="flex flex-col items-center">
            <h2 class="font-bold">Publisher</h2>
            <p>${data.publisher}</p>
            </div>

            <div class="flex flex-col items-center">
            <h2 class="font-bold">ISBN</h2>
            <p>${data.isbn}</p>
            </div>
            
            </div>

            <div class="flex justify-around items-center">

            <div class="flex flex-col items-center">
            <h2 class="font-bold">Number of Pages</h2>
            <p>${data.num_pages}</p>
            </div>

            <div class="flex flex-col items-center">
            <h2 class="font-bold">Publish Date</h2>
            <p>${data.publish_date}</p>
            </div>
            
            
            <div class="flex flex-col items-center">
            <h2 class="font-bold">Available Books</h2>
            <p>${data.available_books}</p>
            </div>

            </div>

            


          
              <button 
              id="${data.reserved ? `return-btn` : `reserve-btn`}" data-id=${
    data.book_id
  } class="py-2 px-6 bg-indigo-500 text-white">${
    data.reserved ? `Return` : `Reserve`
  }
              </button>
              

          
          
        </div>
  `;

  document.body.appendChild(modal);

  modal.style.display = 'block';

  const closeModal = modal.querySelector('.close');
  closeModal.addEventListener('click', () => {
    document.body.removeChild(modal);
  });

  // Reserve Button Functionality
  const reserveButton = document.querySelector('#reserve-btn');

  if (reserveButton) {
    reserveButton.addEventListener('click', async () => {
      try {
        const options = {
          method: 'PATCH',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        };

        const { id } = reserveButton.dataset;
        console.log(id);

        const isBookReserved = reservedBooks.some(
          (book) => book.book_id === id
        );

        if (isBookReserved) {
          console.log('Book is already reserved.');
          return; // Exit if the book is already reserved
        }

        // First Fetch - Wait for it to complete
        const res = await fetch(
          `http://localhost:3000/library/reserve/${id}`,
          options
        );
        const data = await res.json();
        console.log(data);

        if (res.status === 200) {
          console.log('successfully reserved book');
          reservedBooks.push(data);
          localStorage.setItem('reserved', JSON.stringify(reservedBooks));
          displayModal(data);

          // Second Fetch - Initiate it after the first one
          const options2 = {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
          };

          const res2 = await fetch(`http://localhost:3000/reserve/${id}`, options2);
          const data2 = await res2.json();

          console.log(data2);
        }
      } catch (error) {
        console.error('An error occurred:', error);
      }
    });
  }

  // Return Button Functionality
  const returnButton = document.querySelector('#return-btn');

  if (returnButton) {
    returnButton.addEventListener('click', async () => {
      const options = {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      };

      const { id } = returnButton.dataset;

      const res = await fetch(`http://localhost:3000/reserve/${id}`, options);

      // const data = await res.json();

      const response = await fetch(`http://localhost:3000/library/${id}`);
      const data3 = await response.json();
      console.log(data3);

      if (res.status == 200) {
        console.log('successfully returned book');

        const optionsAddOne = {
          method: 'PATCH',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        };
        const resAddOne = await fetch(
          `http://localhost:3000/library/return/${id}`,
          optionsAddOne
        );
        const dataAddOne = await resAddOne.json();
        console.log();
        // const bookId = data.book_id;
        // const updatedReservedBooks = reservedBooks.filter(
        //   (book) => book.book_id !== bookId
        // );
        // reservedBooks = updatedReservedBooks;
        // localStorage.setItem('reserved', JSON.stringify(reservedBooks));
        displayModal(dataAddOne);
      }
    });
  }
};

let reservedBooks = [];

// first fetch

async function firstFetch() {
  const options = {
    method: 'PATCH',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  };

  const { id } = reserveButton.dataset;
  console.log(id);
  const res = await fetch(
    `http://localhost:3000/library/reserve/${id}`,
    options
  );
  const data = await res.json();
  console.log(data);
}

// second fetch
async function secondFetch(data) {
  const options2 = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  };

  const res2 = await fetch('http:localhost:3000/reserve/', options2);
  const data2 = await res2.json();

  console.log(data2);
}

// Global functions

window.onload = () => {
  filterBook('all');
};

getAll.addEventListener('click', () => filterBook('all'));
getNature.addEventListener('click', () => filterBook('nature'));
getScience.addEventListener('click', () => filterBook('Science'));
getFiction.addEventListener('click', () => filterBook('Fiction'));
getPhilosophy.addEventListener('click', () => filterBook('Philosophy'));
getFantasy.addEventListener('click', () => filterBook('Fantasy'));
getHistory.addEventListener('click', () => filterBook('History'));

// things to do 1) add more fetches from google books api to have 40 results for each category of book 2) Display reserved books on user page 3) Add headers and footers to all pages linking site together 4) Styling 5)Testing 6) Presentation 7) Wireframeing
