'use strict';

var mongoose = require('mongoose'),
	mongoosePaginate = require('mongoose-paginate'),
	Schema = mongoose.Schema;

var Image = new Schema({
	src: { type: String, required: true },
	name: { type: String, required: true },
	order: { type: Number },
	createdOn: { type: Date, default: Date.now, required: true },
});

Image.plugin(mongoosePaginate);

module.exports = mongoose.model('Image', Image);
