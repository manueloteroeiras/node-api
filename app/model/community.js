'use strict';

var mongoose = require('mongoose'),
	mongoosePaginate = require('mongoose-paginate'),
	Schema = mongoose.Schema;

var Community = new Schema({
	
	name: { type: String, required: true },
	bannerImg: { type: String, required: true },
	topic: { type: String, required: true },
	status: { type: String, },
	createdOn: { type: Date, default: Date.now, required: true },
});

Community.plugin(mongoosePaginate);

module.exports = mongoose.model('Community', Community);
