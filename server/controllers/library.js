const Book = require("../models/library.js");


async function index(req, res) {
  try {
    const books = await Book.getAll();
    res.status(200).json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}


async function showID (req, res) {
    try {
        let id = parseInt(req.params.id)
        const book = await Book.getOneByID(id);
        res.status(200).json(book)
    } catch(err) {
        res.status(404).json({error: err.message})
    }
}

async function showTitle (req, res) {
    try {
        let title = req.params.title.toLowerCase()
        const book = await Book.getOneByTitle(title);
        res.status(200).json(book)
    } catch(err) {
        res.status(404).json({error: err.message})
    }
}

async function showISBN (req, res) {
  try {
      let isbn = req.params.isbn
      const book = await Book.getOneByISBN(isbn);
      res.status(200).json(book)
  } catch(err) {
      res.status(404).json({error: err.message})
  }
}

async function create (req, res) {
    try {
        data = req.body
        const book = await Book.create(data)
        res.status(201).json(book)

    } catch (err) {
        res.status(400).json({error: err.message})
    }
}

async function update (req, res) {
    try {
        const id = parseInt(req.params.id)
        const data = req.body
        const book = await Book.getOneByID(id)
        const result = await book.update(data)
        res.status(200).json(result)
    } catch (err) {
        res.status(404).json({error: err.message})
    }
}

async function destroy (req, res) {
    try {
        const id = parseInt(req.params.id);
        const book = await Book.getOneByID(id);
        const result = await book.destroy();
        res.status(204).json(result);
    } catch (err) {
        res.status(404).json({error: err.message})
    }
}

module.exports = { index, showID, showTitle, showISBN, create, update, destroy }


