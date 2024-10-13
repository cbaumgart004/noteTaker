const fs = require('fs')
const path = require('path')
const { v4: uuidv4 } = require('uuid')

// Helper functions to read/write JSON files
const readNotes = () => {
  const data = fs.readFileSync(path.join(__dirname, '../db/db.json'), 'utf8')
  return JSON.parse(data)
}

const writeNotes = (notes) => {
  fs.writeFileSync(
    path.join(__dirname, '../db/db.json'),
    JSON.stringify(notes, null, 2)
  )
}

// Export the function to use with Express app
module.exports = (app) => {
  // GET /api/notes - Returns all saved notes as JSON
  app.get('/api/notes', (req, res) => {
    const notes = readNotes()
    res.json(notes)
  })

  // POST /api/notes - Saves a new note to the JSON file
  app.post('/api/notes', (req, res) => {
    const newNote = {
      id: uuidv4(), // Generate a unique id for the note
      title: req.body.title,
      text: req.body.text,
    }

    const notes = readNotes()
    notes.push(newNote)
    writeNotes(notes)
    res.json(newNote)
  })

  // DELETE /api/notes/:id - Deletes a note by its ID from the JSON file
  app.delete('/api/notes/:id', (req, res) => {
    const notes = readNotes()
    const updatedNotes = notes.filter((note) => note.id !== req.params.id)
    writeNotes(updatedNotes)
    res.status(204).end() // 204 status means no content, successful deletion
  })
}
