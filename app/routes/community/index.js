'use strict';

var methods = require("./methods");
var auth = require("../../service/auth");

module.exports = function(server) {

	server.get('/api/community', methods.index);

	server.get('/api/community/:id', methods.show);

	server.post('/api/community', methods.create);

	server.put('/api/community/:id', methods.update);

	server.post('/api/community/delete/:id', methods.delete);

};
