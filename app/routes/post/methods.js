var log = require("../../service/log");
var PostCtrl = require("../../controller/post");

exports.index = function(req, res) {
	log.info("GET /api/posts --- sessionId: "+req.userId);

	PostCtrl.index(req).then(function(data) {
		// log.info(data);
		res.send(200, data);
	}, function(err) {
		log.error(err);
		res.send(err.code, err.error);
	});
}

exports.create = function(req, res) {
	log.info("POST /api/posts --- sessionId: "+req.userId);

	PostCtrl.create(req).then(function(data) {
		log.info(data);
		res.send(200, data);
	}, function(err) {
		log.error(err);
		res.send(err.code, err.error);
	});
};

exports.update = function(req, res) {
	log.info("PUT /api/posts/:id  --- sessionId: "+req.userId);

	PostCtrl.update(req).then(function(data) {
		log.info(data);
		res.send(200, data);
	}, function(err) {
		log.error(err);
		res.send(err.code, err.error);
	});
};

exports.show = function(req, res) {
	log.info("GET /api/posts/:id --- sessionId: "+req.userId);

	PostCtrl.show(req).then(function(data) {
		log.info(data);
		res.send(200, data);
	}, function(err) {
		log.error(err);
		res.send(err.code, err.error);
	});
};

exports.delete = function(req, res) {
	log.info("DELETE /api/posts/:id  --- sessionId: "+req.userId);

	PostCtrl.delete(req).then(function(data) {
		log.info(data);
		res.send(200, data);
	}, function(err) {
		log.error(err);
		res.send(err.code, err.error);
	});
};
