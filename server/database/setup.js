require('dotenv').config();
const apiKey = process.env.apiKey
const fs = require('fs');
const db = require('./connect');

async function google(search){
  const apiData = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${search}&maxResults=40&key=${apiKey}`)
  const response = await apiData.json()
  const items = response.items


  for (const book of items){
      
      
      
      let title = book.volumeInfo.title;
      let author = book.volumeInfo.authors[0] || null
      let category
      console.log(title)
      if (book.volumeInfo.categories != undefined){
        category = book.volumeInfo.categories[0]
      } else {
        category = null
      }
      //let category = book.volumeInfo.categories[0] || null
      let publisher = book.volumeInfo.publisher || null
      let isbn
      if (book.volumeInfo.industryIdentifiers != undefined){
        isbn = book.volumeInfo.industryIdentifiers[0].identifier
      } else {
        isbn = null
      }
      //let isbn = book.volumeInfo.industryIdentifiers.identifier || null
      let num_pages = book.volumeInfo.pageCount || null
      //let publish_date = book.volumeInfo.publishedDate || null
      let date;
      if (book.volumeInfo.publishedDate != undefined && book.volumeInfo.publishedDate.length == 10){
        date = book.volumeInfo.publishedDate
      } else if (book.volumeInfo.publishedDate != undefined && book.volumeInfo.publishedDate.length == 4) {
        date = book.volumeInfo.publishedDate + "-01-01"
      } else if (book.volumeInfo.publishedDate != undefined ** book.volumeInfo.publishedDate.length == 7) {
        date = book.volumeInfo.publishedDate + "-01"
      } else{
        date = null
      }
      let image = book.volumeInfo.imageLinks.thumbnail;
      let available_books = 2;
      console.log(isbn)
      await db.query('INSERT INTO books (title, author, category, publisher, isbn, num_pages, publish_date, book_image, available_books) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *;', 
      [title, author, category, publisher, isbn, num_pages, date, image, available_books])
  }
}


const sql = fs.readFileSync(__dirname + '/library.sql').toString();


db.query(sql)
  .then(data => {
    google("magic").then(()=>{
      db.end()
      console.log("Setup complete")
    })
  })
  .catch(error => console.log(error));
