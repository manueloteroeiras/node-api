'use strict';

var User = require('../model/user');
var Q = require('q');
var _ = require('lodash');
// var processor = require('../service/email/mail-processor');

exports.show = function(data) {
	return Q.Promise(function(resolve, reject) {
		User
			.findById(data.params.id, '-hashedPassword -salt').lean()

			.exec(function (err, user) {
				if (err) return reject({ code: 500, error: err });
				if (!user) return reject({ code: 404, error: "user not found." });
				resolve(user);
			});

	});
};



exports.export = function(data) {
	return Q.Promise(function(resolve, reject) {

		var query = {};
		if (data.query.agency) query["agency"] = data.query.agency;

		User
			.find(query)
			.exec(function(err, results) {
				if (err) return reject({ code: 500, error: err });
				resolve({ results: results });
			});

	});
};


exports.index = function(data) {
	return Q.Promise(function(resolve, reject) {

		var query = { role: "user" };

		User.paginate(
			query,
			{
				sortBy: { createdOn:-1},
				limit: data.query.limit || 30,
				page: data.query.page || 1,
				populate: [ "community" ],
				lean: true
			},
			function (err, users, pageCount, itemCount) {
				if (err) return reject({ code: 500, error: err });
				resolve({ results: users, totalItems: itemCount, totalPages: pageCount });
			}
		);



	});
};

exports.me = function(data) {
	return Q.Promise(function(resolve, reject) {
		User
			.findById(data.userId, '-hashedPassword -salt').lean()
			.exec(function (err, user) {
				if (err) return reject({ code: 500, error: err });
				if (!user) return reject({ code: 404, error: "user not found." });
				resolve(user);
			});
	});
};

exports.create = function(data) {
	return Q.Promise(function(resolve, reject) {

		data.body.createdOn = new Date();
		delete data.body.role;
		delete data.body.hashedPassword;
		delete data.body.salt;
		delete data.body._id;

		User.create(data.body, function(err, user) {
			if (err) return reject({ code: 500, error: err });
			var data = user.toJSON();
			delete data.hashedPassword;
			delete data.salt;
			resolve(data);
		});
	});
}

exports.update = function(data) {
	return Q.Promise(function(resolve, reject) {

		delete data.body._id;
		delete data.body.hashedPassword;
		delete data.body.salt;
		delete data.body.role;

		User.findById(data.params.id, '-hashedPassword -salt', function (err, user) {
			if (err) return reject({ code: 500, error: err });
			if (!user) return reject({ code: 404, error: "user not found." });

			var updated = _.assign(user, data.body);
			updated.save(function(err) {
				if (err) return reject({ code: 500, error: err });
				resolve(updated.toJSON());
			});
		});
	});
};
exports.delete = function(data) {
	return Q.Promise(function(resolve, reject) {
		User.findById(data.params.id, function (err, result) {
			if (err) return reject({ code: 500, error: err });
			if (!result) return reject({ code: 404, error: "user not found." });

			result.remove(function (err) {
				if (err) return reject({ code: 500, error: err });
				resolve(data.params.id + ' removed!');
			});
		});
	});
};

exports.resetpsw = function(data) {
	return Q.Promise(function(resolve, reject) {


		User.findOne( { email: data.params.email.toLowerCase(), active: true }, function (err, result) {
			if (err) return reject({ code: 500, error: err });
			if (!result) return reject({ code: 404, error: "user not found." });


			var password  = result.email.substring(0, result.email.indexOf("@"))+ '1234';

			result.salt = result.makeSalt();
			result.hashedPassword = result.encryptPassword(password);

			result.save(function (err) {
				if (err) return reject({ code: 500, error: err });
				// processor.sendMailResetPsw(result, password);
				resolve(result.id + ' updated!');
			});
		});
	});
};


exports.changePsw = function(data) {
	return Q.Promise(function(resolve, reject) {
		delete data.body._id;
		delete data.body.hashedPassword;
		delete data.body.salt;
		delete data.body.role;

		User.findById(data.params.id, '-hashedPassword -salt', function (err, user) {

			if (err) return reject({ code: 500, error: err });
			if (!user) return reject({ code: 404, error: "user not found." });

			user.salt = user.makeSalt();
			user.hashedPassword = user.encryptPassword(data.body.password);
			user.save(function(err) {
				if (err) return reject({ code: 500, error: err });
				resolve(user.toJSON());
			});
		});
	});
};
