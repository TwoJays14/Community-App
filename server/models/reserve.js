const db = require('../database/connect')
require("dotenv").config()

class Reserve {
    constructor({reserve_id, book_id, user_id}) {
        this.reserve_id = reserve_id
        this.book_id = book_id
        this.user_id = user_id
    }

    static async create (data) {
        const { book_id } = data
        const response = await db.query("INSERT INTO reserved_books (book_id) SELECT book_id FROM books WHERE reserved = true;", [book_id])
        return new Reserve(response)
    }
} 

module.exports = Reserve
