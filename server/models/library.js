const db = require('../database/connect');
require('dotenv').config();
class Book {
  constructor({
    book_id,
    user_id,
    title,
    author,
    publisher,
    category,
    book_description,
    isbn,
    num_pages,
    publish_date,
    book_image,
    available_books,
    reserved,
  }) {
    this.book_id = book_id;
    this.user_id = user_id;
    this.title = title;
    this.author = author;
    this.publisher = publisher;
    this.category = category;
    this.book_description = book_description;
    this.isbn = isbn;
    this.num_pages = num_pages;
    this.publish_date = publish_date;
    this.book_image = book_image;
    this.available_books = available_books;
    this.reserved = reserved;
  }

  static async getAll() {
    const response = await db.query('SELECT * FROM books ORDER BY title;');
    if (response.rows.length === 0) {
      throw new Error('No books available.');
    }
    return response.rows.map((b) => new Book(b));
  }

  static async getAllByCategory(category) {
    const response = await db.query(
      'SELECT * FROM books WHERE LOWER(category) = $1;',
      [category]
    );
    if (response.rows.length === 0) {
      throw new Error('No books available.');
    }
    return response.rows.map((b) => new Book(b));
  }

  static async getOneByID(id) {
    const response = await db.query('SELECT * FROM books WHERE book_id = $1;', [
      id,
    ]);
    if (response.rows.length != 1) {
      throw new Error('That book is not available.');
    }
    return new Book(response.rows[0]);
  }

  static async getOneByTitle(title) {
    const response = await db.query(
      'SELECT * FROM books WHERE LOWER(title) = $1;',
      [title]
    );
    if (response.rows.length === 0) {
      throw new Error('That book is not available.');
    }
    return new Book(response.rows[0]);
  }

  static async getOneByISBN(isbn) {
    const response = await db.query('SELECT * FROM books WHERE isbn = $1;', [
      isbn,
    ]);
    if (response.rows.length != 1) {
      throw new Error('That book is not available.');
    }
    return new Book(response.rows[0]);
  }

  static async create(data) {
    const {
      title,
      author,
      category,
      book_description,
      publisher,
      isbn,
      num_pages,
      publish_date,
      book_image,
      available_books,
    } = data;
    const response = await db.query(
      'INSERT INTO books (title, author, category, book_description, publisher, isbn, num_pages, publish_date, book_image, available_books) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *',
      [
        title,
        author,
        category,
        book_description,
        publisher,
        isbn,
        num_pages,
        publish_date,
        book_image,
        available_books,
      ]
    );
    const id = response.rows[0].book_id;
    const newBook = await Book.getOneByID(id);
    return new Book(newBook);
  }

  async update(data) {
    const {
      title,
      author,
      category,
      book_description,
      publisher,
      isbn,
      num_pages,
      publish_date,
      book_image,
      available_books,
    } = data;
    const response = await db.query(
      'UPDATE books SET title = $1, author = $2, category = $3, book_description = $4, publisher = $5, isbn = $6, num_pages = $7, publish_date = $8, book_image = $9, available_books = $10 WHERE book_id = $11 RETURNING *;',
      [
        title,
        author,
        category,
        book_description,
        publisher,
        isbn,
        num_pages,
        publish_date,
        book_image,
        available_books,
        this.book_id,
      ]
    );
    if (response.rows.length != 1) {
      throw new Error('Unable to update book');
    }

    return new Book(response.rows[0]);
  }

  async reserveBook() {
    const response = await db.query(
      'UPDATE books SET available_books = available_books -1, reserved = true WHERE reserved = false AND book_id = $1 RETURNING *;',
      [this.book_id]
    );

    if (response.rows.length != 1) {
      throw new Error('Unable to update books.');
    } else if (this.available_books <= 0) {
      throw new Error('Unable to reserve as no books available');
    }

    return new Book(response.rows[0]);
  }

  async returnBook() {
    const response = await db.query(
      'UPDATE books SET available_books = available_books + 1 WHERE reserved = true AND book_id = $1 RETURNING *;',
      [this.book_id]
    );
    if (response.rows.length != 1) {
      throw new Error('Unable to update books.');
    } else if (this.available_books >= 10) {
      throw new Error(
        'Unable to return book because all books have been returned '
      );
    }

    return new Book(response.rows[0]);
  }

  // async isReserved () {
  //   const response = await db.query("UPDATE books set reserved = NOT reserved WHERE book_id = $1;", [this.book_id])
  //   return new Book(response)

  // }

  // async updateUser () {
  //   const response = await db.query("UPDATE books AS b SET b.user_id = user_account.user_id FROM account_name AS u WHERE b.user_id = u.user_id;")
  //   return new Book(response)
  // }

  async destroy() {
    const response = await db.query(
      'DELETE FROM books WHERE book_id = $1 RETURNING *;',
      [this.book_id]
    );
    if (response.rows.length != 1) {
      throw new Error('Unable to delete book.');
    }

    return new Book(response.rows[0]);
  }
}

module.exports = Book;
