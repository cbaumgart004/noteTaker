//initialize express app
const express = require('express')
const path = require('path')
const fs = require('fs')
const { v4: uuidv4 } = require('uuid')

const app = express()
const port = process.env.port || 3000

//Middleware to parse JSON request bodies
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))

//API routes
require('./routes/apiRoutes')(app)

//html routes
require('./routes/htmlRoutes')(app)

//start the server

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})

//Error handling middleware

app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})
