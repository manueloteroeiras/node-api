'use strict';

var auth = require("../../service/auth");

module.exports = function(server) {

	server.post('/auth', auth.auth);

	server.post('/regsiter', auth.register);


};
