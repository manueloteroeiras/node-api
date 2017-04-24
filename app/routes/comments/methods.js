var log = require("../../service/log");
var CommentCtrl = require("../../controller/comments");

exports.create = function(req, res) {
	log.info("POST /api/comments --- sessionId: "+req.userId);

	CommentCtrl.create(req).then(function(data) {
		log.info(data);
		res.send(200, data);
	}, function(err) {
		log.error(err);
		res.send(err.code, err.error);
	});
};

exports.update = function(req, res) {
	log.info("PUT /api/comments/:id  --- sessionId: "+req.userId);

	CommentCtrl.update(req).then(function(data) {
		log.info(data);
		res.send(200, data);
	}, function(err) {
		log.error(err);
		res.send(err.code, err.error);
	});
};

exports.show = function(req, res) {
	log.info("GET /api/comments/:id --- sessionId: "+req.userId);

	CommentCtrl.show(req).then(function(data) {
		log.info(data);
		res.send(200, data);
	}, function(err) {
		log.error(err);
		res.send(err.code, err.error);
	});
};

exports.delete = function(req, res) {
	log.info("DELETE /api/comments/:id  --- sessionId: "+req.userId);

	CommentCtrl.delete(req).then(function(data) {
		log.info(data);
		res.send(200, data);
	}, function(err) {
		log.error(err);
		res.send(err.code, err.error);
	});
};
