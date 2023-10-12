const db = require('../database/connect')

class Reserve {
    constructor({reserve_id, book_id, user_id}) {
        this.reserve_id = reserve_id
        this.book_id = book_id
        this.user_id = user_id
    }

    static async getAll() {
        const response = await db.query('SELECT * FROM reserved_books;');
        if (response.rows.length === 0) {
          throw new Error('No books available.');
        }
        return response.rows.map((b) => new Reserve(b));
      }

    static async getOneByID(id) {
        const response = await db.query('SELECT * FROM reserved_books WHERE book_id = $1;', [
          id,
        ]);
        if (response.rows.length != 1) {
          throw new Error('That book is not available.');
        }
        return new Reserve(response.rows[0]);
      }

    static async create () {
        const response = await db.query("INSERT INTO reserved_books (book_id) SELECT book_id FROM books WHERE reserved = true RETURNING *;")
        return new Reserve(response)
    }

    async destroy () {
        const response = await db.query("WITH deleted_rows AS (DELETE FROM reserved_books WHERE book_id = $1 RETURNING *) UPDATE books SET reserved = false WHERE book_id = $1 RETURNING *;", [this.book_id])

          return new Reserve(response.rows[0]);
    }
} 

module.exports = Reserve
