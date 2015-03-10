;(function() {
	'use strict';

	angular.module('dashboard')
	.directive('nps', function() {
		var controller;

		controller = function controller($scope) {

			// $scope.removeItem = function removeItem(item) {
			// 	$scope.data.$remove(item);	
			// };

			// $scope.add = function add() {
			// 	$scope.data.$add($scope.newNps);
			// 	$scope.newTodo = '';
			// };

		};

		return {
			restrict: 'E',
			scope: {
				data: '=',
				npsTotalData: '='
			},
			templateUrl: 'views/npsDirective.html',
			controller: controller,
			transclude: true
		};
	});
})();