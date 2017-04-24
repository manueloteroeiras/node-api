'use strict';

var log = require("../../service/log");
var UserCtrl = require("../../controller/user");

exports.show = function(req, res) {
	log.info("GET /api/users/:id --- sessionId: "+req.userId);

	UserCtrl.show(req).then(function(data) {
		log.info(data);
		res.send(200, data);
	}, function(err) {
		log.error(err);
		res.send(err.code, err.error);
	});
};

exports.index = function(req, res) {
	log.info("GET /api/users --- sessionId: "+req.userId);

	UserCtrl.index(req).then(function(data) {
		log.info(data);
		res.send(200, data);
	}, function(err) {
		log.error(err);
		res.send(err.code, err.error);
	});
};

exports.export = function(req, res) {
	log.info("GET /api/users/export --- sessionId: "+req.userId);

	UserCtrl.export(req).then(function(data) {
		log.info(data);
		res.send(200, data);
	}, function(err) {
		log.error(err);
		res.send(err.code, err.error);
	});
};


exports.me = function(req, res) {
	log.info("GET /api/me --- sessionId: "+req.userId);

	UserCtrl.me(req).then(function(data) {
		log.info(data);
		res.send(200, data);
	}, function(err) {
		log.error(err);
		res.send(err.code, err.error);
	});
};

exports.create = function(req, res) {
	log.info("POST /api/users --- sessionId: "+req.userId);

	req.body.role = "user";
	req.body.status = 'active';

	UserCtrl.create(req).then(function(data) {
		log.info(data);
		res.send(200, data);
	}, function(err) {
		log.error(err);
		res.send(err.code, err.error);
	});
}

exports.update = function(req, res) {
	log.info("PUT /api/users/:id  --- sessionId: "+req.userId);

	UserCtrl.update(req).then(function(data) {
		log.info(data);
		res.send(200, data);
	}, function(err) {
		log.error(err);
		res.send(err.code, err.error);
	});
};


exports.delete = function(req, res) {
	log.info("DELETE /api/users/delete/:id  --- sessionId: "+req.userId);

	UserCtrl.delete(req).then(function(data) {
		log.info(data);
		res.send(200, data);
	}, function(err) {
		log.error(err);
		res.send(err.code, err.error);
	});
};

exports.resetpsw = function(req, res) {
	log.info("PUT /api/users/resetpsw/:email  --- sessionId: "+req.userId);

	UserCtrl.resetpsw(req).then(function(data) {
		log.info(data);
		res.send(200, data);
	}, function(err) {
		log.error(err);
		res.send(err.code, err.error);
	});
};

exports.changepsw = function(req, res) {
	log.info("POST /api/users/changepsw --- sessionId: "+req.userId);

	UserCtrl.changePsw(req).then(function(data) {
		log.info(data);
		res.send(200, data);
	}, function(err) {
		log.error(err);
		res.send(err.code, err.error);
	});
}
