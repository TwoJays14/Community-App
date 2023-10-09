const express = require('express');
const cors = require('cors');
const libraryRouter = require('./routers/library');
const logger = require('morgan');

const app = express();

app.use(cors());
app.use(logger('dev')) 
app.use(express.json());

app.use('/library', libraryRouter);

app.get('/', (req, res) => res.send('Hello there!'))
app.post('/', (req, res) => res.status(405).send('Not allowed!'))

module.exports = app
