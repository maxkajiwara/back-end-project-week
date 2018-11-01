require('dotenv').config;

// const localPg = {
// 	host: 'localhost',
// 	database: process.env.DB_NAME,
// 	user: process.env.DB_USER,
// 	password: process.env.DP_PASS
// };

// const dbConnection = process.env.DATABASE_URL || localPg;
const dbConnection = process.env.DATABASE_URL;

module.exports = {
	development: {
		client: 'sqlite3',
		connection: {
			filename: './database.sqlite3'
		},
		useNullAsDefault: true,
		migrations: {
			directory: './migrations',
			tableName: 'migrations'
		},
		seeds: { directory: './seeds' }
	},

	production: {
		client: 'pg',
		connection: dbConnection,
		pool: {
			min: 2,
			max: 10
		},
		migrations: {
			directory: './migrations',
			tableName: 'migrations'
		},
		seeds: { directory: './seeds' }
	}
};
