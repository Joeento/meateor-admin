'use strict';

angular.
  module('meateorAdminApp').
  config(['$locationProvider', '$routeProvider',
    function config($locationProvider, $routeProvider) {
      $locationProvider.hashPrefix('!');

      $routeProvider.
        when('/restaurants', {
          template: '<restaurant-list></restaurant-list>'
        }).
        when('/restaurants/:restaurantId', {
          template: '<photo-view></photo-view>'
        }).
        otherwise('/restaurants');
    }
  ]);