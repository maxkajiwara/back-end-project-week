const db = require('../config/dbConfig');

module.exports = {
	getNotes,
	getNote,
	addNote,
	updateNote,
	deleteNote,
	addNoteTag
};

// Without tags
// function getNotes(id) {
// 	let query = db('notes');

// 	if (id) {
// 		return query.where({ id }).then(([note]) => note || undefined);
// 	} else {
// 		return query;
// 	}
// }

// This returns a note row for every tag.
// function getNotes() {
// 	return db
// 		.select(
// 			'note_tags.note_id',
// 			'notes.title',
// 			'notes.textBody',
// 			'note_tags.tag_id',
// 			'tags.text'
// 		)
// 		.from('notes')
// 		.innerJoin('note_tags', 'notes.id', 'note_tags.note_id')
// 		.innerJoin('tags', 'note_tags.tag_id', 'tags.id');
// }

// This works! Can compare performance of .filter().map() to .reduce().
// function getNotes() {
// 	return db('notes').then(notes => {
// 		return db('tags')
// 			.join('note_tags', 'tags.id', 'note_tags.tag_id')
// 			.select('note_tags.note_id', 'tags.id', 'tags.text')
// 			.then(tags => {
// 				return notes.map(note => {
// 					noteTags = tags
// 						.filter(({ note_id }) => note_id === note.id)
// 						.map(({ note_id, ...tag }) => tag);
// 					return { ...note, tags: noteTags };
// 				});
// 			});
// 	});
// }

function getNotes() {
	return db('notes').then(notes => {
		return db('tags')
			.join('note_tags', 'tags.id', 'note_tags.tag_id')
			.select('note_tags.note_id', 'tags.id', 'tags.text')
			.then(tags => {
				return notes.map(note => {
					noteTags = tags.reduce(
						(arr, { note_id, ...tag }) =>
							note_id === note.id ? [...arr, tag] : arr,
						[]
					);
					return { ...note, tags: noteTags };
				});
			});
	});
}

function getNote(id) {
	return db('notes')
		.where({ id })
		.then(([note]) => {
			if (!note) return undefined;
			else {
				return db('tags')
					.join('note_tags', 'tags.id', 'note_tags.tag_id')
					.select('note_tags.note_id', 'tags.id', 'tags.text')
					.where({ note_id: id })
					.then(tags => {
						return notes.map(note => {
							const noteTags = tags
								.filter(({ note_id }) => note_id === note.id)
								.map(({ note_id, ...tag }) => tag);
							return { ...note, tags: noteTags };
						});
					});
			}
		});
}

function addNote(note) {
	return db('notes')
		.insert(note)
		.then(([id]) => id);
}

function updateNote(id, changes) {
	return db('notes')
		.where({ id })
		.update(changes);
}

function deleteNote(id) {
	return db('notes')
		.where({ id })
		.del();
}

function addNoteTag(note_id, tag_id) {
	// Does note exist?
	return db('notes')
		.where({ id: note_id })
		.then(([found]) => {
			if (found) {
				// Does tag exist?
				return db('tags')
					.where({ id: tag_id })
					.then(([found]) => {
						if (found) {
							return db('note_tags')
								.insert({ note_id, tag_id })
								.then(([index]) => ({ index }));
						} else {
							const response = { notFound: 'tag' };
							return response;
						}
					});
			} else {
				const response = { notFound: 'note' };
				console.log(response);
				return response;
			}
		});
}

// This tried too do too many things at once
// function addTag(note_id, text) {
// 	console.log(
// 		db('notes')
// 			.where({ id: note_id })
// 			.first()
// 			.then(logMe => console.log(logMe))
// 	);

// 	return db('notes')
// 		.where({ id: note_id })
// 		.then(([{ id: found }]) => {
// 			console.log(found);
// 			if (found) {
// 				return db('tags')
// 					.where({ text })
// 					.then(([{ id }]) => {
// 						console.log(id);
// 						if (id) {
// 							return db('note_tags')
// 								.where({ note_id, tag_id: id })
// 								.then(([found]) => {
// 									if (found) {
// 										res.status(405).json({ error: 'duplicate tag' });
// 									} else {
// 										return db('note_tags')
// 											.insert({ note_id, tag_id: id })
// 											.then(([id]) => id);
// 									}
// 								});
// 						} else {
// 							return db('tags')
// 								.insert({ text })
// 								.then(([tag_id]) => {
// 									return db('note_tags')
// 										.insert({ note_id, tag_id })
// 										.then(() => tag_id);
// 								});
// 						}
// 					});
// 			} else {
// 				return undefined;
// 			}
// 		});
// }
