const { Router } = require('express');

const bookController = require('../controllers/library.js');

const bookRouter = Router();

bookRouter.get('/', bookController.index)
bookRouter.get('/category/:category', bookController.category)
bookRouter.get('/:id', bookController.showID)
bookRouter.get('/title/:title', bookController.showTitle)
bookRouter.get('/isbn/:isbn', bookController.showISBN)
bookRouter.post('/', bookController.create)
bookRouter.patch('/:id', bookController.update)
bookRouter.patch('/reserve/:id', bookController.reserve)
bookRouter.patch('/return/:id', bookController.returnBook)
// bookRouter.patch('/user', bookController.newUser)
bookRouter.delete('/:id', bookController.destroy)

module.exports = bookRouter;
