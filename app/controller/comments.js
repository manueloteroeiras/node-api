var Comment = require('../model/comments');
var _ = require('lodash');
var Q = require('q');


exports.create = function(data) {
	return Q.Promise(function(resolve, reject) {

		data.body.createdOn = new Date();

		Comment.create(data.body, function(err, result) {
			if (err) return reject({ code: 500, error: err });
			resolve(result.toJSON());
		});
	});
};

exports.update = function(data) {
	return Q.Promise(function(resolve, reject) {
		Comment.findById(data.params.id, function (err, result) {
			if (err) return reject({ code: 500, error: err });
			if (!result) return reject({ code: 404, error: "Comment not found." });

			var updated = _.assign(result, data.body);
			updated.save(function (err) {
				if (err) return reject({ code: 500, error: err });
				resolve(updated.toJSON());
			});
		});
	});
};

exports.show = function(data) {
	return Q.Promise(function(resolve, reject) {
		Comment
			.findById(data.params.id)
			.lean()
			.exec(function (err, result) {
				if (err) return reject({ code: 500, error: err });
				resolve(result);
			});
	});
};

exports.delete = function(data) {
	return Q.Promise(function(resolve, reject) {
		Comment.findById(data.params.id, function (err, result) {
			if (err) return reject({ code: 500, error: err });
			if (!result) return reject({ code: 404, error: "Comment not found." });

			result.remove(function (err) {
				if (err) return reject({ code: 500, error: err });
				resolve(data.params.id + ' removed!');
			});
		});
	});
};
