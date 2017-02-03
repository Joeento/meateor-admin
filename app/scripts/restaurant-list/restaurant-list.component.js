'use strict';

angular
.module('restaurantList')
.component('restaurantList', {
    templateUrl: 'scripts/restaurant-list/restaurant-list.template.html',
    controller: function RestaurantListController($http) {
        var self = this;

        $http.get('api/restaurants', {params: {location: 'San Francisco'}}).then(function(response) {
            self.restaurants = response.data;
        });


		self.search_options = {
			types: ['(cities)']
		};

    }
});