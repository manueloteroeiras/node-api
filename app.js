/**
 * Main application file
 */

'use strict';

require('dotenv').load();
require("babel/register");

var config = require('./config/environment');
var restify = require('restify');
var mongoose = require('mongoose');
var log = require('./app/service/log');


// Connect to database
log.info('MongoDB connecting...');
mongoose.connect(config.mongo.uri, config.mongo.options);
mongoose.connection
	.on('error', function(err) {
		log.error('MongoDB connection error: ' + err);
		process.exit(-1);
	})
	.on('open', function() {
		log.info('MongoDB connection successful.');
	});

// Populate DB with sample data
if (config.seedDB) { require('./config/seed'); }

// Setup server
var server = restify.createServer({
	name: 'node-api-rest',
	log: log
});
server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());

server.pre(restify.CORS({
	origins: ['*'],
	credentials: true,
	headers: ['X-Requested-With', 'Authorization']
}));

server.pre(restify.fullResponse());

// server.on('MethodNotAllowed', function (req, res) {
// 	if (req.method.toLowerCase() === 'options') {
// 		var allowHeaders = ['Accept', 'Accept-Version', 'Content-Type', 'Api-Version', 'Origin', 'X-Requested-With', 'Authorization'];

// 		if (res.methods.indexOf('OPTIONS') === -1) res.methods.push('OPTIONS');

//     	res.header('Access-Control-Allow-Credentials', true);
//     	res.header('Access-Control-Allow-Headers', allowHeaders.join(', '));
//     	res.header('Access-Control-Allow-Methods', res.methods.join(', '));
//     	res.header('Access-Control-Allow-Origin', req.headers.origin);

// 		return res.send(200);
// 	} else {
// 		return res.send(new restify.MethodNotAllowedError());
// 	}
// });

server.on('after', restify.auditLogger({ log: log }));
require('./app/routes')(server);

// Start server
server.listen(config.port, function () {
	log.info('Restify server listening on %d, in %s mode', config.port, config.env);
});

// Expose app
exports = module.exports = server;
