'use strict';

var User = require("../../model/user");
var UserCtrl = require("../../controller/user");
var log = require('../log');

exports.auth = function(req, res, next) {
	log.info("POST /auth");
	if (req.body && req.body.email && req.body.password) {
		User.findOne({ email: req.body.email.toLowerCase() }).populate('community').exec(function(err, user){
			if (err) {
				log.error(err);
				return res.send(500, "Error, try later");
			}
			if (user) {
				if (!user.authenticate(req.body.password)) {
					log.error("invalid email/password");
					res.send(400, "Invalid email or password");
				} else {
					var data = user.toJSON();
					delete data.hashedPassword;
					delete data.salt;
					log.info(data);
					res.send(200, data);
				}
			} else {
				log.error("user not found");
				res.send(404, "Invalid email or password");
			}
		});
	} else {
		log.error("bad request");
		res.send(400, "Bad request");
	}
};

exports.register = function(req, res, next) {
	log.info("POST /register");

	req.body.role = "user";
	req.body.active = false;

	UserCtrl.create(req).then(function(data) {
		log.info(user);
		res.send(200, user);
	}, function(err) {
		log.error(err);
		res.send(err.code, err.error);
	});
};

exports.isAuthenticated = function(req, res, next) {
	if (req.headers.authorization || req.query.token) {
		req.userId = req.headers.authorization || req.query.token;
		next();
	} else {
		res.send(403, "not logged in");
	}
};

exports.isAdministrator = function(req, res, next) {
	if (req.headers.authorization || req.query.token) {
		req.userId = req.headers.authorization || req.query.token;
		next();
	} else {
		res.send(403, "not logged in");
	};
};
