exports.up = function(knex, Promise) {
	return knex.schema.createTable('note_tags', table => {
		table
			.integer('note_id')
			.unsigned()
			.references('notes.id')
			.onDelete('CASCADE');
		table
			.integer('tag_id')
			.unsigned()
			.references('tags.id')
			.onDelete('CASCADE');
		table.unique(['note_id', 'tag_id']);
	});
};

exports.down = function(knex, Promise) {
	return knex.schema.dropTableIfExists('note_tags');
};
