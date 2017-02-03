'use strict';

angular
.module('restaurantList')
.component('restaurantList', {
	templateUrl: 'scripts/restaurant-list/restaurant-list.template.html',
	controller: function RestaurantListController($http) {
		var self = this;
		self.search_options = {
			types: ['(cities)']
		};

		self.selectCity = function() {
			$http.get('api/restaurants', {params: {location: self.city.formatted_address}}).then(function(response) {
				self.restaurants = response.data;
			});
		};




	}
});