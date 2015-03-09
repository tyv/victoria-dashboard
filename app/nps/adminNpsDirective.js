;(function() {
	'use strict';

	angular.module('dashboard')
	.directive('adminNps', function() {
		var controller;

		controller = function controller($scope) {
			
			$scope.removeItem = function removeItem(item) {
				$scope.data.$remove(item);	
			};

			$scope.add = function add() {
				$scope.data.$add({
					score: $scope.score,
					name: $scope.name
				});
				$scope.score = '';
				$scope.name = '';
			};

			$scope.save = function save() {
				$scope.data.forEach(function(customer) {
					$scope.data.$save(customer);
				});
			};

		};

		return {
			restrict: 'E',
			scope: {
				data: '='
			},
			templateUrl: 'views/adminNpsDirective.html',
			controller: controller
		};
	});
})();