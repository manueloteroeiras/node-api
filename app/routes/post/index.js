'use strict';

var methods = require("./methods");
var auth = require("../../service/auth");

module.exports = function(server) {

	server.get('/api/posts', methods.index);

	server.get('/api/posts/:id', methods.show);

	server.post('/api/posts', methods.create);

	server.put('/api/posts/:id', methods.update);

	server.post('/api/posts/delete/:id', methods.delete);

};
