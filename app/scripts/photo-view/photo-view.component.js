'use strict';

angular.
  module('photoView').
  component('photoView', {
    template: 'TBD: Detail view for <span>{{$ctrl.restaurantId}}</span>',
    controller: ['$routeParams',
      function PhotoViewController($routeParams) {
        this.restaurantId = $routeParams.restaurantId;
      }
    ]
  });