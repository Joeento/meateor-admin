'use strict';

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var PhotoSchema   = new Schema({
	yelp_id: String,
	caption: String,
    restaurant_id: String,
    approved: Boolean
});

module.exports = mongoose.model('Photo', PhotoSchema);