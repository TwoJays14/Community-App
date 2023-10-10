'use strict';

let books = {
  data: [
    {
      bookName: "Sing a Black Girl's Song",
      category: 'Non-Fiction',
      price: '19.99',
      image:
        'https://contentcafe2.btol.com/ContentCafe/Jacket.aspx?userID=GWH11030&password=CC64392&Value=9780306828515&content=L&Return=1&Type=L',
    },
    {
      bookName: "Sing a Black Girl's Song",
      category: 'Non-Fiction',
      price: '19.99',
      image:
        'https://contentcafe2.btol.com/ContentCafe/Jacket.aspx?userID=GWH11030&password=CC64392&Value=9780306828515&content=L&Return=1&Type=L',
    },
    {
      bookName: "Sing a Black Girl's Song",
      category: 'Non-Fiction',
      price: '19.99',
      image:
        'https://contentcafe2.btol.com/ContentCafe/Jacket.aspx?userID=GWH11030&password=CC64392&Value=9780306828515&content=L&Return=1&Type=L',
    },
  ],
};

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
