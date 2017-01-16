'use strict';

// Define the `phonecatApp` module
var phonecatApp = angular.module('phonecatApp', []);

phonecatApp.
component('phoneList', {
  template:
    '<ul>' +
    '<li ng-repeat="phone in $ctrl.phones">' +
    '<span>{{phone.name}}</span>' +
    '<p>{{phone.snippet}}</p>' +
    '</li>' +
    '</ul>',
  controller: function PhoneListController() {
    var self = this;

    $http.get('api/restaurants').then(function(response) {
      console.log(response)
      self.phones = response.data;
    });
  }
});