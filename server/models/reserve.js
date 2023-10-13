const db = require('../database/connect');

class Reserve {
  constructor({
    reserve_id,
    book_id,
    title,
    author,
    publisher,
    category,
    book_description,
    isbn,
    num_pages,
    publish_date,
    book_image,
    available_books
  }) {
    this.reserve_id = reserve_id;
    this.book_id = book_id;
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
  }

  static async getAll() {
    const response = await db.query('SELECT * FROM reserved_books;');
    if (response.rows.length === 0) {
      throw new Error('No books available.');
    }
    return response.rows.map((b) => new Reserve(b));
  }

  static async getOneByID(id) {
    const response = await db.query(
      'SELECT * FROM reserved_books WHERE book_id = $1;',
      [id]
    );
    if (response.rows.length != 1) {
      throw new Error('That book is not available.');
    }
    return new Reserve(response.rows[0]);
  }

  static async create(bookId) {
    const response = await db.query(`
      INSERT INTO reserved_books (book_id, title, author, category, book_description, publisher, isbn, num_pages, publish_date, book_image, available_books)
      SELECT b.book_id, b.title, b.author, b.category, b.book_description, b.publisher, b.isbn, b.num_pages, b.publish_date, b.book_image, b.available_books
      FROM books AS b
      WHERE b.book_id = $1
      RETURNING *;
    `, [bookId]);
    return new Reserve(response);
  }

  async destroy() {
    const response = await db.query(
      'WITH deleted_rows AS (DELETE FROM reserved_books WHERE book_id = $1 RETURNING *) UPDATE books SET reserved = false WHERE book_id = $1 RETURNING *;',
      [this.book_id]
    );

    return new Reserve(response.rows[0]);
  }
}

module.exports = Reserve;
