;(function() {
	'use strict';

	angular.module('dashboard')
	.directive('satisfaction', function() {
		var controller;

		controller = function controller($scope) {

		};

		return {
			restrict: 'E',
			scope: {
				data: '='
			},
			templateUrl: 'views/satisfactionDirective.html',
			controller: controller
		};
	});
})();