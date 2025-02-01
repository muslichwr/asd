//import express
const express = require('express')

const cors = require('cors')

const bodyParser = require('body-parser')

const path = require('path')

const router = require('./routes')

const app = express()

app.use(cors())

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())
//init app

//define port
const port = 3000;

//route
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/api', router);

app.get('/uploads/:filename', (req, res) => {
    res.sendFile(path.join(__dirname, 'uploads', req.params.filename));
});

//start server
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
})