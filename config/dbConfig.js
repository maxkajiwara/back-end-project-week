const knex = require('knex');
const knexConfig = require('./knexfile');

const dbConfig = knex(knexConfig.development);

module.exports = {
	dbConfig
};
