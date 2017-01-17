'use strict';

angular.
module('photoView').
component('photoView', {
	templateUrl: 'scripts/photo-view/photo-view.template.html',
	controller: ['$routeParams', '$http',
	function PhotoViewController($routeParams, $http) {
		this.restaurantId = $routeParams.restaurantId;
		var self = this;

		$http.get('api/photo/' + this.restaurantId).then(function(response) {
			self.photo = response.data;
		});
	}
	]
});