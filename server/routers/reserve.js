const { Router } = require('express');

const reserveController = require('../controllers/reserve.js');

const reserveRouter = Router();

reserveRouter.post("/", reserveController.create)


module.exports = reserveRouter
