const db = require('../config/dbConfig');

module.exports = {
	getNotes,
	addNote,
	updateNote,
	deleteNote,
	addNoteTag
};

function getNotes(id) {
	let query = db('notes');

	if (id) {
		return query.where({ id }).then(([note]) => note || undefined);
	} else {
		return query;
	}
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
