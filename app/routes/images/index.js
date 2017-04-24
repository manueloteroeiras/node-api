'use strict';

var methods = require("./methods");
var auth = require("../../service/auth");

module.exports = function(server) {

	server.get('/api/images', methods.index);

	server.get('/api/images/:id', methods.show);

	server.post('/api/images', methods.create);

	server.put('/api/images/:id', methods.update);

	server.post('/api/images/delete/:id', methods.delete);

};
