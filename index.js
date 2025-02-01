//import express
const express = require('express')

const cors = require('cors')

const bodyParser = require('body-parser')

app.use(cors())

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())
//init app
const app = express()

//define port
const port = 3000;

//route
app.get('/', (req, res) => {
  res.send('Hello World!')
})

//start server
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
})