'use strict';

const getData = async () => {
  const res = await fetch('http://localhost:3000/library');
  const data = await res.json();
  console.log(data);
};

getData();

for (let i of books.data) {
  let card = document.createElement('div');
  card.classList.add('card', 'i.category');

  let imgContainer = document.createElement('div');
  imgContainer.classList.add('image-container');

  let image = document.createElement('img');
  image.setAttribute('src', i.image);

  imgContainer.appendChild(image);
  card.appendChild(imgContainer);

  let container = document.createElement('div');
  container.classList.add('container');

  let name = document.createElement('h5');
  name.classList.add('book-name');
  name.innerText = i.bookName.toUpperCase();
  container.appendChild(name);

  card.appendChild(container);
  document.getElementById('books').appendChild(card);
}
