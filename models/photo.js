'use strict';

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var PhotoSchema   = new Schema({
	yelp_id: String,
	caption: String,
    restaurant_id: String
});

module.exports = mongoose.model('Photo', PhotoSchema);