const { Router } = require('express');

const bookController = require('../controllers/library.js');

const bookRouter = Router();

bookRouter.get('/', bookController.index);
bookRouter.get('/category/:category', bookController.category);
bookRouter.get('/:id', bookController.showID);
bookRouter.get('/title/:title', bookController.showTitle);
bookRouter.get('/isbn/:isbn', bookController.showISBN);
bookRouter.post('/', bookController.create);
bookRouter.patch('/:id', bookController.update);
bookRouter.delete('/:id', bookController.destroy);
bookRouter.post('/title/:title', bookController.showGoogle);

module.exports = bookRouter;
