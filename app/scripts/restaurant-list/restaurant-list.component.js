'use strict';

angular
.module('restaurantList')
.component('restaurantList', {
    template:
      '<ul>' +
      '<li ng-repeat="restaurant in $ctrl.restaurants">' +
      '<a href="#!/restaurants/{{restaurant.id}}">{{restaurant.name}}</a>' +
      '</li>' +
      '</ul>',
    controller: function RestaurantListController($http) {
        var self = this;

        $http.get('api/restaurants').then(function(response) {
            self.restaurants = response.data;
        });

    }
});