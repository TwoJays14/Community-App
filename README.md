# **Florin & Burkes County Council Community Library App**

## Project Description

We were contacted by the Florin County Council (who have since merged with Burkes Council) to create a community app. The council have been suffering from a number of issues whilst also having to deal with government cuts so they are increasingly having to rely on community involvement and they are trying to think of creative solutions to keep valued public services running. We have baeen asked to come up with a tech solution for a problem the stakeholders in the local community are facing. The problem we decided to address is: 

”It is inconceivable to me, that the very institution that honed my cunning, crafty, and clever mind, should now face closure. Staffing the library is becoming increasingly difficult, at the very point when more people are wanting to use our services.”

After thinking of various ideas and solutions, we decided to create an online library app where users can log-in to reserve and return books. Before, starting work on the solution we perfomed some solution analysis, stakeholder analysis and we came up with an ERD diagram and Wireframe. 


## Agile Framework

In order to manage this project as efficiently as possible, we followed the Kanban framework where all artifacts of the project were stored on a Kanban board, giving the team full transparency on what had been completed, what was in progress and what was on the backlog. It also allowed us to split tasks between ourselves and to know who was responsible for what. We used Trello to create this board, attached below is a picture of our Trello Board midway through the project. 


## Technologies Used

For this project we used Javascript, HTML, CSS and Tailwind. We used Javascript to code the backend, making use of the Express and CORS packages to connect with the Google Books API. We also used the packages pg and fs in order to connect with out ElephantSQL database. Also, we used a dotenv file and its package in order to specify our port, API key and database URL. We used the Morgan package as a middleware logger to allow us to test for errors more easily and to make sure everything was working correctly on the backend and the right status codes were being sent when a certain function was executed.

For authentication, we used Bcrypt in order to add a salt and hash to our stored passwords as a form of security. We then used the uuid package in order to create a token which is stored in the local storage of the user's browser so they remain logged in. 


## Installation & Usage

To install and use this app, you must first clone this repository into a folder of your choice then you must run the following NPM commands inside your terminal. 


* ```npm install``` 
* ```npm install cors express pg fs morgan uuid dotenv```

Then you will want to create a ```.env``` file with three keys: 

* A ```PORT``` key assigned to the port of your choice. 
* A ```DB_URL``` key assigned to the database URL using ElephantSQL
* A ```apiKey``` used for the Google Books API which can be obtained for free from [Google Credentials Page](https://console.cloud.google.com/apis/credentials)

In your terminal while in the server folder, run ```npm run setup-db``` to set up the database. Then to set up the server run ```npm run dev```
 

## Challenges & Code We Are Proud Of

One of our largest challenges was implementing the Google Books API since we are all new to using APIs so we are very proud of our API setup code which was integrated directly into the database setup.

```require('dotenv').config();
const apiKey = process.env.apiKey;
const fs = require('fs');
const db = require('./connect');

async function google(search) {
  const apiData = await fetch(
    `https://www.googleapis.com/books/v1/volumes?q=${search}&maxResults=40&key=${apiKey}`
  );
  const response = await apiData.json();
  const items = response.items;

  for (const book of items) {
    let title = book.volumeInfo.title;
    let author;
    if (book.volumeInfo.authors != undefined) {
      author = book.volumeInfo.authors[0];
    } else {
      author = null;
    }
    let category;
    if (book.volumeInfo.categories != undefined) {
      category = book.volumeInfo.categories[0];
    } else {
      category = null;
    }
    //let category = book.volumeInfo.categories[0] || null
    let book_description;
    if (book.volumeInfo.description != undefined) {
      book_description = book.volumeInfo.description;
    } else {
      book_description = null;
    }
    let publisher = book.volumeInfo.publisher || null;
    let isbn;
    if (book.volumeInfo.industryIdentifiers != undefined) {
      isbn = book.volumeInfo.industryIdentifiers[0].identifier;
    } else {
      isbn = null;
    }

    let num_pages = book.volumeInfo.pageCount || null;
    
    let date;
    if (
      book.volumeInfo.publishedDate != undefined &&
      book.volumeInfo.publishedDate.length == 10
    ) {
      date = book.volumeInfo.publishedDate;
    } else if (
      book.volumeInfo.publishedDate != undefined &&
      book.volumeInfo.publishedDate.length == 4
    ) {
      date = book.volumeInfo.publishedDate + '-01-01';
    } else if (
      book.volumeInfo.publishedDate != undefined &&
      book.volumeInfo.publishedDate.length == 7
    ) {
      date = book.volumeInfo.publishedDate + '-01';
    } else {
      date = null;
    }
    let image = book.volumeInfo.imageLinks.thumbnail;
    let available_books = 2;
    await db.query(
      'INSERT INTO books (title, author, category, book_description, publisher, isbn, num_pages, publish_date, book_image, available_books) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *;',
      [
        title,
        author,
        category,
        book_description,
        publisher,
        isbn,
        num_pages,
        date,
        image,
        available_books,
      ]
    );
  }
}

const sql = fs.readFileSync(__dirname + '/library.sql').toString();

db.query(sql)
  .then((data) => {
    google('subject:science').then();
    google('subject:fiction').then();
    google("subject:geography").then()
    google("subject:fantasy").then()
    google('subject:nature').then(() => {
      db.end();
      console.log('Setup complete');
    })
  // })
  .catch((error) => console.log(error));
```

## Bugs

* Have not implemented multiple users. Multiple users can access the website, but cannot reserve the same book.



## Future Features 

For future features, we would have created the website so that more than one person can reserve the same book at the same time, which is an issue we are currently facing and we would complete the contact form so that it actually contacts the admin of the website. We could add a recommendation feature so that users could recommend a book to be added to the system which would also make use of our create book function and we could also add previews for books so that users can read the first chapter for example.