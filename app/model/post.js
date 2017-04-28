'use strict';

var mongoose = require('mongoose'),
	mongoosePaginate = require('mongoose-paginate'),
	Schema = mongoose.Schema;

var Post = new Schema({
	
	user: { type: Schema.Types.ObjectId, ref: 'User', default: null },
	text: { type: String, required: true },
	images: [{ type: Schema.Types.ObjectId, ref: 'Image', default: null }],
	likes: [{ type: Schema.Types.ObjectId, ref: 'User', default: null }],
	comments: [{ type: Schema.Types.ObjectId, ref: 'Comment', default: null }],
	community: { type: Schema.Types.ObjectId, ref: 'Community', default: null },
	status: { type: String },
	createdOn: { type: Date, default: Date.now, required: true },
});

Post.plugin(mongoosePaginate);

module.exports = mongoose.model('Post', Post);
