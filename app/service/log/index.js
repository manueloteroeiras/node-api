var bunyan = require('bunyan');

var log = bunyan.createLogger({
	name	: 'api',
	level	: 'info',
	stream	: process.stdout
});

module.exports = log;
