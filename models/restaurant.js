'use strict';

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var RestaurantSchema   = new Schema({
	name: String,
    yelp_id: String
});

module.exports = mongoose.model('Restaurant', RestaurantSchema);