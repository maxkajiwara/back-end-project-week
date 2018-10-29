const express = require('express');

const router = express.Router();

// Models
const noteModel = require('../models/noteModel');

// get notes
router.get('/', (req, res) => {
	noteModel
		.getNotes()
		.then(notes => {
			res.status(201).json(notes);
		})
		.catch(err => res.status(500).json(err));
});

// get note by id
router.get('/:id', (req, res) => {
	const { id } = req.params;

	noteModel
		.getNotes(id)
		.then(note => {
			if (note) {
				res.status(201).json(note);
			} else {
				res.status(404).json({ error: 'no note by that id' });
			}
		})
		.catch(err => res.status(500).json(err));
});

// add note

// update note

// delete note

module.exports = router;
