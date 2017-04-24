var Post = require('../model/post');
var _ = require('lodash');
var Q = require('q');



exports.index = function(data) {
	return Q.Promise(function(resolve, reject) {
		Post.find().populate([ 'community', 'images', 'comments', 'user' ]).exec(function(err, response){
			(!err) ? resolve({ result: response }) : reject({ code : 500, error: err })
		});
	});
};

exports.create = function(data) {
	return Q.Promise(function(resolve, reject) {

		data.body.createdOn = new Date();

		Post.create(data.body, function(err, result) {
			if (err) return reject({ code: 500, error: err });
			resolve(result.toJSON());
		});
	});
};

exports.update = function(data) {
	return Q.Promise(function(resolve, reject) {
		Post.findById(data.params.id, function (err, result) {
			if (err) return reject({ code: 500, error: err });
			if (!result) return reject({ code: 404, error: "Post not found." });

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
		Post
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
		Post.findById(data.params.id, function (err, result) {
			if (err) return reject({ code: 500, error: err });
			if (!result) return reject({ code: 404, error: "Post not found." });

			result.remove(function (err) {
				if (err) return reject({ code: 500, error: err });
				resolve(data.params.id + ' removed!');
			});
		});
	});
};
