'use strict';
const modal = document.getElementById('modal');
// const books = document.getElementById('books');

const savedData = localStorage.getItem('reserved');
const parsedData = JSON.parse(savedData);

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

const fetchReservedBooks = async () => {
  const res = await fetch(`http://localhost:3000/reserve/`);
  const data = await res.json();

  console.log(data);
  displayAllBooks(data);
};

fetchReservedBooks();

const displayModal = (data) => {
  modal.innerHTML = `
  <div class="modal-content flex flex-col  bg-white mx-auto p-5 border-2 border-slate-500 max-w-2xl relative">
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
        console.log('succesfully returned book');

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
