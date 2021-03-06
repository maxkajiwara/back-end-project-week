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
		.getNote(id)
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
	const { title, textBody } = req.body;

	if (!title || !textBody) {
		res.status(422).json({ error: 'must provide title and textBody' });
	} else {
		const note = { title, textBody };

		noteModel
			.addNote(note)
			.then(id => {
				res.status(200).json({ message: `note added with id ${id}` });
			})
			.catch(err => res.status(500).json(err));
	}
});

// update note
router.put('/:id', (req, res) => {
	const { title, textBody } = req.body;

	if (!title || !textBody) {
		res.status(422).json({ error: 'must provide title and textBody' });
	} else {
		const { id } = req.params;
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
	}
});

// delete note
router.delete('/:id', (req, res) => {
	const { id } = req.params;

	noteModel
		.deleteNote(id)
		.then(count => {
			if (count) {
				res.status(200).json({ message: 'note deleted' });
			} else {
				res.status(404).json({ error: 'no note by that id' });
			}
		})
		.catch(err => res.status(500).json(err));
});

// add tag to note by id
router.post('/:note_id/tags', (req, res) => {
	const { note_id } = req.params;
	const { tag_id } = req.body;

	if (!tag_id) {
		res.status(422).json({ error: 'must provide tag id' });
	} else {
		noteModel
			.addNoteTag(note_id, tag_id)
			.then(({ index, notFound }) => {
				if (notFound) {
					res.status(404).json({ error: `no ${notFound} by that id` });
				} else {
					if (index) {
						res.status(200).json({ message: 'tag added to note' });
					} else {
						res
							.status(500)
							.json({ error: 'something went wrong in the database' });
					}
				}
			})
			.catch(err => {
				if (err.code === 'SQLITE_CONSTRAINT') {
					res.status(409).json({ error: 'note already has this tag' });
				} else {
					res.status(500).json(err);
				}
			});
	}
});

// remove tag from note by id
router.delete('/:note_id/tags/:tag_id', (req, res) => {
	const { note_id, tag_id } = req.params;

	noteModel
		.removeNoteTag(note_id, tag_id)
		.then(count => {
			if (count) {
				res.status(200).json({ message: 'tag removed from note' });
			} else {
				res.status(404).json({ error: 'note+tag combination does not exist' });
			}
		})
		.catch(err => res.status(500).json(err));
});

module.exports = router;
