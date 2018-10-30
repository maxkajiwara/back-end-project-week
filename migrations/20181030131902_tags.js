exports.up = function(knex, Promise) {
	return knex.schema.createTable('tags', table => {
		table.increments();
		table.string('text', 36).notNullable();
	});
};

exports.down = function(knex, Promise) {
	return knex.schema.dropTableIfExists('tags');
};
