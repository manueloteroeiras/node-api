'use strict';

var mongoose = require('mongoose'),
	mongoosePaginate = require('mongoose-paginate'),
	crypto = require('crypto'),
	Schema = mongoose.Schema;

var UserSchema = new Schema({
	firstName: { type: String, required: true },
	email: { type: String, lowercase: true, required: true },
	lastName: { type: String, required: true },
	role: { type: String, default: "user" },
	profilePicture: { type: String },
	salt: { type: String, required: true },
	hashedPassword: { type: String, required: true },
	createdOn: { type: Date, default: Date.now, required: true },
	community:{ type: Schema.Types.ObjectId, ref: 'Community', default: null },
	facebook:{ type: Object, default: null },
	bornDate: { type: Date },
	username: { type: String },
});

/**
 * Virtuals
 */

UserSchema
	.virtual('password')
	.set(function(password) {
		this._password = password;
		this.salt = this.makeSalt();
		this.hashedPassword = this.encryptPassword(password);
	})
	.get(function() {
		return this._password;
	});

/**
 * Validations
 */

UserSchema
	.path('role')
	.validate(function(role) {
		return role === "administrator" || role === "user";
	}, 'role value is invalid');

/**
 * Methods
 */

UserSchema.methods = {

	authenticate: function(plainText) {
		return this.encryptPassword(plainText) === this.hashedPassword;
	},

	makeSalt: function() {
		return crypto.randomBytes(16).toString('base64');
	},

	encryptPassword: function(password) {
		if (!password || !this.salt) return '';
		var salt = new Buffer(this.salt, 'base64');
		return crypto.pbkdf2Sync(password, salt, 10000, 64).toString('base64');
	}

};

UserSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('User', UserSchema);
