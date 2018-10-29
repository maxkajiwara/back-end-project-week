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
router.post('/', (req, res) => {
	noteModel
		.addNote(note)
		.then(id => {
			res.status(200).json({ message: `note added with id ${id}` });
		})
		.catch(err => res.status(500).json(err));
});

// update note
router.put('/:id', (req, res) => {
	const { title, textBody } = req.body;
	const changes = { title, textBody };

	noteModel
		.updateNote(id, changes)
		.then(count => {
			if (count) {
				res.status(200).json({ message: `note updated` });
			} else {
				res.status(404).json({ error: 'no note by that id' });
			}
		})
		.catch(err => res.status(500).json(err));
});

// delete note
router.delete('/:id', (req, res) => {
	noteModel
		.deleteNote(id)
		.then(count => {
			if (count) {
				res.status(200).json({ message: `note deleted` });
			} else {
				res.status(404).json({ error: 'no note by that id' });
			}
		})
		.catch(err => res.status(500).json(err));
});

module.exports = router;
