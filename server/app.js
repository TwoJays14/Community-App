require('dotenv').config()
const apiKey = process.env.apiKey
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


app.use("/google", async (req, res) =>{
    const apiData = await fetch(`https://www.googleapis.com/books/v1/volumes?q=magic&maxResults=40&key=${apiKey}`)
    const response = await apiData.json()
    res.json(response.items)
    //res.send(response.items[0].volumeInfo.title, response.items[0].volumeInfo.authors,response.items[0].volumeInfo.publisher, response.items[0].volumeInfo.industryIdentifiers[1].identifier, response.items[0].volumeInfo.pageCount, response.items[0].volumeInfo.publishedDate)

})






module.exports = app
