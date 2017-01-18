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
			$http.get('api/photo/' + self.restaurantId).then(function(response) {
				self.photo = response.data;
			});
		};

		loadPhoto();
		

		self.approvePhoto = function() {
			
			var photo_info = {
				id: self.photo.id,
				caption: self.caption,
				restaurantId: this.restaurantId
			};
			$http.post('api/photo/', photo_info).then(function(response) {
				console.log('success');
			});
			loadPhoto();
		};
		self.denyPhoto = function() {
			loadPhoto();
		};
	}
	]
});