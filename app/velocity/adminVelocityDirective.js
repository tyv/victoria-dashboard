;(function() {
	'use strict';

	angular.module('dashboard')
	.directive('adminVelocity', function() {
		var controller;

		controller = function controller($scope) {
			$scope.save = function save() {
				$scope.data.$save();
			};
		};

		return {
			restrict: 'E',
			scope: {
				data: '='
			},
			templateUrl: 'views/adminVelocityDirective.html',
			controller: controller
		};
	});
})();