var log = require("../../service/log");
var ImageCtrl = require("../../controller/images");

exports.index = function(req, res) {
	log.info("GET /api/images --- sessionId: "+req.userId);

	ImageCtrl.index(req).then(function(data) {
		log.info(data);
		res.send(200, data);
	}, function(err) {
		log.error(err);
		res.send(err.code, err.error);
	});
}

exports.create = function(req, res) {
	log.info("POST /api/images --- sessionId: "+req.userId);

	ImageCtrl.create(req).then(function(data) {
		log.info(data);
		res.send(200, data);
	}, function(err) {
		log.error(err);
		res.send(err.code, err.error);
	});
};

exports.update = function(req, res) {
	log.info("PUT /api/images/:id  --- sessionId: "+req.userId);

	ImageCtrl.update(req).then(function(data) {
		log.info(data);
		res.send(200, data);
	}, function(err) {
		log.error(err);
		res.send(err.code, err.error);
	});
};

exports.show = function(req, res) {
	log.info("GET /api/images/:id --- sessionId: "+req.userId);

	ImageCtrl.show(req).then(function(data) {
		log.info(data);
		res.send(200, data);
	}, function(err) {
		log.error(err);
		res.send(err.code, err.error);
	});
};

exports.delete = function(req, res) {
	log.info("DELETE /api/images/:id  --- sessionId: "+req.userId);

	ImageCtrl.delete(req).then(function(data) {
		log.info(data);
		res.send(200, data);
	}, function(err) {
		log.error(err);
		res.send(err.code, err.error);
	});
};
