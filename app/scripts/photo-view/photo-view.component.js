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

		var savePhoto = function(approved) {
			var photo_info = {
				id: self.photo.id,
				caption: self.photo.caption,
				restaurantId: self.restaurantId,
				approved: approved
			};
			$http.post('api/photo/', photo_info).then(function(response) {
				loadPhoto();
			});
		};

		loadPhoto();
		self.approvePhoto = function() {
			savePhoto(true);
			loadPhoto();
			
		};
		self.denyPhoto = function() {
			savePhoto(false);
			loadPhoto();
		};
	}
	]
});