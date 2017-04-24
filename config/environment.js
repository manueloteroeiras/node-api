'use strict';

var path = require('path');

function requiredProcessEnv(name) {
	if(!process.env[name]) {
		throw new Error('You must set the ' + name + ' environment variable');
	}
	return process.env[name];
}

// All configurations will extend these options
// ============================================
var all = {
	env: process.env.NODE_ENV || 'development',

	// Root path of server
	root: path.normalize(__dirname + '/..'),

	// Server port
	port: process.env.PORT || 8080,

	// Server IP
	ip: process.env.IP || '0.0.0.0',

	// Should we populate the DB with sample data?
	seedDB: process.env.SEED_DB === "true" ? true : false,

	// MongoDB connection options
	mongo: {
		uri: process.env.MONGODB_URI || 'mongodb://localhost/node-api',
		options: {
			server: {
				auto_reconnect: true,
				socketOptions: {
					keepAlive: 1
				}
			},
			db: {
				safe: true
			}
		}
	}

};

// Export the config object based on the NODE_ENV
// ==============================================
module.exports = all;
