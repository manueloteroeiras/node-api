'use strict';

var mongoose = require('mongoose'),
	mongoosePaginate = require('mongoose-paginate'),
	Schema = mongoose.Schema;

var Comment = new Schema({
	user: { type: Schema.Types.ObjectId, ref: 'User', default: null },
	text: { type: String, required: true },
	post: { type: Schema.Types.ObjectId, ref: 'Post', default: null },
	createdOn: { type: Date, default: Date.now, required: true },
});

Comment.plugin(mongoosePaginate);

module.exports = mongoose.model('Comment', Comment);
