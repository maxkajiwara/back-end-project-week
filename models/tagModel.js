const db = require('../config/dbConfig');

module.exports = {
	addTag,
	getTagByText,
	updateTag,
	deleteTag
};

function addTag(tag) {
	return db('tags')
		.insert(tag)
		.then(([id]) => id);
}

function getTagByText(text) {
	return db('tags')
		.where({ text })
		.then(([{ id }]) => id);
}

function updateTag(id, changes) {
	return db('tags')
		.where({ id })
		.update(changes);
}

function deleteTag(id) {
	return db('tags')
		.where({ id })
		.del();
}
