const express = require('express');

const router = express.Router();

// Models
const tagModel = require('../models/tagModel');

// create tag
router.post('/', (req, res) => {
	const { text } = req.body;

	if (!text) {
		res.status(422).json({ error: 'tag cannot be empty' });
	} else {
		const tag = { text };

		tagModel
			.addTag(tag)
			.then(tag_id => {
				res.status(200).json(tag_id);
			})
			.catch(err => {
				if (err.code === '23505' || 'SQLITE_CONSTRAINT') {
					// Haven't figured out how to return the id from the first query
					return tagModel.getTagByText(text).then(tag_id => {
						res.status(200).json(tag_id);
					});
				} else {
					return res.status(500).json(err);
				}
			});
	}
});

// update tag
router.put('/:id', (req, res) => {
	const { text } = req.body;

	if (!text) {
		res.status(422).json({ error: 'tag cannot be empty' });
	} else {
		const { id } = req.params;
		const changes = { text };

		tagModel
			.updateTag(id, changes)
			.then(count => {
				if (count) {
					res.status(200).json({ message: `tag updated` });
				} else {
					res.status(404).json({ error: 'no tag by that id' });
				}
			})
			.catch(err => res.status(500).json(err));
	}
});

// delete tag
router.delete('/:id', (req, res) => {
	const { id } = req.params;

	tagModel
		.deleteTag(id)
		.then(count => {
			if (count) {
				res.status(200).json({ message: `tag deleted` });
			} else {
				res.status(404).json({ error: 'no tag by that id' });
			}
		})
		.catch(err => res.status(500).json(err));
});

module.exports = router;
