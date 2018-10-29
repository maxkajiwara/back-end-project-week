const db = require('../config/dbConfig');

module.exports = {
	getNotes,
	addNote,
	updateNote,
	deleteNote
};

function getNotes(id) {
	let query = db('notes');

	if (id) {
		return query.where({ id }).then(([note]) => note || undefined);
	} else {
		return query;
	}
}

function addNote(note) {}

function updateNote(note) {}

function deleteNote(id) {}
