'use strict';

angular.
  module('photoView').
  component('photoView', {
    templateUrl: 'scripts/photo-view/photo-view.template.html',
    controller: ['$routeParams',
        function PhotoViewController($routeParams) {
            this.restaurantId = $routeParams.restaurantId;
        }
    ]
  });