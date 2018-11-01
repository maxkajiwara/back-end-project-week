const db = require('../config/dbConfig');

module.exports = {
	getNotes,
	getNote,
	addNote,
	updateNote,
	deleteNote,
	addNoteTag,
	removeNoteTag
};

function getNotes() {
	return db('notes').then(notes => {
		return db('tags')
			.join('note_tags', 'tags.id', 'note_tags.tag_id')
			.select('note_tags.note_id', 'tags.id', 'tags.text')
			.then(tags => {
				return notes.map(note => {
					const noteTags = tags.reduce(
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
						const noteTags = tags.reduce(
							(arr, { note_id, ...tag }) =>
								note_id === note.id ? [...arr, tag] : arr,
							[]
						);
						return { ...note, tags: noteTags };
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

function removeNoteTag(note_id, tag_id) {
	return db('note_tags')
		.where({ note_id, tag_id })
		.del();
}
