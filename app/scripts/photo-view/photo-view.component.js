'use strict';

angular.
module('photoView').
component('photoView', {
	templateUrl: 'scripts/photo-view/photo-view.template.html',
	controller: ['$routeParams', '$http',
	function PhotoViewController($routeParams, $http) {
		this.restaurantId = $routeParams.restaurantId;
		var self = this;

		var loadPhoto = function() {
			console.log('yes');
			$http.get('api/photo/' + self.restaurantId).then(function(response) {
				self.photo = response.data;
			});
		};

		loadPhoto();
		

		self.approvePhoto = function() {
			loadPhoto();
		};
		self.denyPhoto = function() {
			loadPhoto();
		};
	}
	]
});