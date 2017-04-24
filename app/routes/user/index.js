'use strict';

var methods = require("./methods");
var auth = require("../../service/auth");

module.exports = function(server) {

	server.get('/api/users', methods.index);

	server.get('/api/users/export', auth.isAdministrator, methods.export);

	server.post('/api/users/changepsw/:id', auth.isAdministrator, methods.changepsw);

	server.get('/api/users/:id', methods.show);

	server.post('/api/users', methods.create);

	server.put('/api/users/:id', auth.isAdministrator, methods.update);

	server.get('/api/me', auth.isAuthenticated, methods.me);

	server.post('/api/users/delete/:id', auth.isAdministrator, methods.delete);

	server.put('/api/users/resetpsw/:email',  methods.resetpsw);


};
