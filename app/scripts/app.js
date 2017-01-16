'use strict';

// Define the `meateorAdminApp` module
var meateorAdminApp = angular.module('meateorAdminApp', []);

meateorAdminApp.
component('restaurantList', {
    template:
      '<ul>' +
      '<li ng-repeat="restaurant in $ctrl.restaurants">' +
      '<span>{{restaurant.name}}</span>' +
      '<p>{{restaurant.snippet}}</p>' +
      '</li>' +
      '</ul>',
    controller: function RestaurantListController($http) {
        var self = this;

        $http.get('api/restaurants').then(function(response) {
            self.restaurants = response.data;
        });
    }
});