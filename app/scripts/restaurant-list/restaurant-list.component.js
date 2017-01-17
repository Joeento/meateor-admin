'use strict';

angular
.module('restaurantList')
.component('restaurantList', {
    templateUrl: 'scripts/restaurant-list/restaurant-list.template.html',
    controller: function RestaurantListController($http) {
        var self = this;

        $http.get('api/restaurants').then(function(response) {
            self.restaurants = response.data;
        });

    }
});