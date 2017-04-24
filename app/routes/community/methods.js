var log = require("../../service/log");
var CommunityCtrl = require("../../controller/community");

exports.index = function(req, res) {
	log.info("GET /api/community --- sessionId: "+req.userId);

	CommunityCtrl.index(req).then(function(data) {
		log.info(data);
		res.send(200, data);
	}, function(err) {
		log.error(err);
		res.send(err.code, err.error);
	});
}

exports.create = function(req, res) {
	log.info("POST /api/community --- sessionId: "+req.userId);

	CommunityCtrl.create(req).then(function(data) {
		log.info(data);
		res.send(200, data);
	}, function(err) {
		log.error(err);
		res.send(err.code, err.error);
	});
};

exports.update = function(req, res) {
	log.info("PUT /api/community/:id  --- sessionId: "+req.userId);

	CommunityCtrl.update(req).then(function(data) {
		log.info(data);
		res.send(200, data);
	}, function(err) {
		log.error(err);
		res.send(err.code, err.error);
	});
};

exports.show = function(req, res) {
	log.info("GET /api/community/:id --- sessionId: "+req.userId);

	CommunityCtrl.show(req).then(function(data) {
		log.info(data);
		res.send(200, data);
	}, function(err) {
		log.error(err);
		res.send(err.code, err.error);
	});
};

exports.delete = function(req, res) {
	log.info("DELETE /api/community/:id  --- sessionId: "+req.userId);

	CommunityCtrl.delete(req).then(function(data) {
		log.info(data);
		res.send(200, data);
	}, function(err) {
		log.error(err);
		res.send(err.code, err.error);
	});
};
