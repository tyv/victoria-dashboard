;(function() {
	'use strict';

	angular.module('dashboard')
	.directive('adminSatisfaction', function() {
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
			templateUrl: 'views/adminSatisfactionDirective.html',
			controller: controller
		};
	});
})();