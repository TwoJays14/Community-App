const { Router } = require('express');

const reserveController = require('../controllers/reserve.js');

const reserveRouter = Router();

reserveRouter.get("/", reserveController.index)
reserveRouter.get('/:id', reserveController.showID)
reserveRouter.post("/:id", reserveController.create)
reserveRouter.delete("/:id", reserveController.destroy)

module.exports = reserveRouter
