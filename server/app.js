const express = require('express');
const cors = require('cors');
const logger = require('morgan');

const libraryRouter = require('./routers/library');
const userRouter = require('./routers/user');

const app = express();

app.use(cors());
app.use(logger('dev')) 
app.use(express.json());

app.use('/library', libraryRouter);
app.use("/users", userRouter)

app.get('/', (req, res) => res.send('Hello there!'))
app.post('/', (req, res) => res.status(405).send('Not allowed!'))

module.exports = app
