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

// add note

// update note

// delete note

module.exports = router;
