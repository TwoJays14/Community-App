const db = require('../database/connect')

class Book {
    constructor( {book_id, title, ISBN, num_pages, publish_date, publisher_id, available_books, reserved}) {
         this.book_id = book_id
         this.title = title
         this.isbn = ISBN
         this.num_pages = num_pages
         this.publish_date = publish_date
         this.publisher_id = publisher_id
         this.available_books = available_books
         this.reserved = reserved   
    }


}

module.exports = Book
