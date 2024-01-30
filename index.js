const express = require('express');
const { check, validationResult } = require('express-validator');
const fs = require('fs');

const app = express();
app.use(express.json());

// In-memory store for notes
let notes = []; 

// Helper function to get notes from file
const loadNotes = () => {
  try {
    const data = fs.readFileSync('notes.json', 'utf8');
    console.log(data);
    notes = JSON.parse(data);
  } catch (err) {
    console.error(err);
  }
}

// Helper function to save notes to file
const saveNotes = () => {
  fs.writeFileSync('notes.json', JSON.stringify(notes));
}

// Load initial notes
loadNotes();

// GET all notes
app.get('/notes', (req, res) => {
  res.json(notes);
});

// Data validation middlewares
const validateNote = [
  check('title')
    .isLength({ min: 3 })
    .withMessage('Title is required and should be at least 3 chars long'),
  check('body')
    .isLength({ min: 3 })
    .withMessage('Body is required and should be at least 3 chars long')
];

// POST a new note
app.post('/notes', validateNote, (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  
  const note = {
    id: notes.length + 1,
    title: req.body.title,
    body: req.body.body
  };

  notes.push(note);
  saveNotes();
  res.status(201).json(note);
});

// GET a single note by id
app.get('/notes/:id', (req, res) => {
  const note = notes.find(n => n.id === parseInt(req.params.id));
  if (!note) return res.status(404).send('Note not found');
  res.json(note);
});

// PUT update an existing note
app.put('/notes/:id', validateNote, (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const note = notes.find(n => n.id === parseInt(req.params.id));
  if (!note) return res.status(404).send('Note not found');

  note.title = req.body.title;
  note.body = req.body.body;
  saveNotes();
  res.json(note);
});

// DELETE a note
app.delete('/notes/:id', (req, res) => {
  notes = notes.filter(n => n.id !== parseInt(req.params.id));
  saveNotes();
  res.sendStatus(204); 
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));