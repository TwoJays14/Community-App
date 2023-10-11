const db = require('../database/connect')
const Book = require('../models/library')

class Reserve {
    constructor({reserve_id, book_id, user_id}) {
        this.reserve_id = reserve_id
        this.book_id = book_id
        this.user_id = user_id
    }

    static async create () {
        const response = await db.query("INSERT INTO reserved_books (book_id) SELECT book_id FROM books WHERE reserved = true RETURNING book_id;")
        return new Reserve(response)
    }
} 

module.exports = Reserve
