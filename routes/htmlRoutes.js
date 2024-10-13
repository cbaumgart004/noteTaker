const path = require('path')

const express = require('express')

const app = express()

module.exports = (app) => {
  //route for notes
  app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/notes.html'))
  })

  //route for home page
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'))
  })
}
