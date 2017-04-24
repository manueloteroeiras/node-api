'use strict';

var methods = require("./methods");
var auth = require("../../service/auth");

module.exports = function(server) {

	server.get('/api/comments/:id', methods.show);

	server.post('/api/comments', methods.create);

	server.put('/api/comments/:id', methods.update);

	server.post('/api/comments/delete/:id', methods.delete);

};
