;(function() {
	'use strict';

	angular.module('dashboard')
	.directive('velocity', function() {
		var controller;

		controller = function controller($scope) {

		};

		return {
			restrict: 'E',
			scope: {
				data: '='
			},
			templateUrl: 'views/velocityDirective.html',
			controller: controller
		};
	});
})();