exports.up = function(knex, Promise) {
	return knex.schema.createTable('tags', table => {
		table.increments();
		table
			.string('text')
			.notNullable()
			.unique();
	});
};

exports.down = function(knex, Promise) {
	return knex.schema.dropTableIfExists('tags');
};
