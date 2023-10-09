const db = require('../database/connect')

class Book {
    constructor({book_id, title, author, publisher, isbn, num_pages, publish_date, available_books, reserved}) {
         this.book_id = book_id
         this.title = title
         this.author = author
         this.publisher = publisher
         this.isbn = isbn
         this.num_pages = num_pages
         this.publish_date = publish_date
         this.available_books = available_books
         this.reserved = reserved   
    }

    static async getAll() {
        const response = await db.query("SELECT * FROM books ORDER BY title;")
        if (response.rows.length === 0) {
            throw new Error("No books available.")
        }
        return response.rows.map(b => new Book(b));
    }

    static async getOneByID(id) {
        const response = await db.query("SELECT * FROM books WHERE book_id = $1;", [id]);
        if (response.rows.length != 1) {
            throw new Error("That book is not available.")
        }
        return response.rows.map(b => new Book(b));
    }

    static async getOneByTitle(title) {
        const response = await db.query("SELECT * FROM books WHERE LOWER(title) = $1;", [title]);
        if (response.rows.length != 0) {
            throw new Error("That book is not available.")
        }
        return response.rows.map(b => new Book(b));
    }


    static async getOneByISBN(isbn) {
        const response = await db.query("SELECT * FROM books WHERE isbn = $1;", [isbn]);
        if (response.rows.length != 1) {
            throw new Error("That book is not available.")
        }
        return response.rows.map(b => new Book(b));
    }

    static async create (data) {
        const {title, author, publisher, isbn, num_pages, publish_date, available_books} = data
        const response = await db.query('INSERT INTO books (title, author, publisher, isbn, num_pages, publish_date, available_books) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *', [title, author, publisher, isbn, num_pages, publish_date, available_books])
        const id = response.rows[0].book_id
        const newBook = await Book.getOneByID(id)
        return new Book(newBook)
    }

     async update (data) {
        const response = await db.query("UPDATE books SET title = $1, author = $2, publisher = $3, isbn = $4, num_pages = $5, publish_date = $6, available_books = $7 WHERE book_id = $8 RETURNING *;", 
        [data.title, data.author, data.publisher, data.isbn, data.num_pages, data.publish_date, data.available_books, this.book_id])
        if (response.rows.length != 1) {
            throw new Error ("Unable to update book")
        }

        return new Book(response.rows[0])
    }

    async destroy() {
        const response = await db.query('DELETE FROM books WHERE book_id = $1 RETURNING *;', [this.book_id]);
        if (response.rows.length != 1) {
            throw new Error("Unable to delete book.")
        }
        return new Book(response.rows[0]);
    }

}

module.exports = Book;
