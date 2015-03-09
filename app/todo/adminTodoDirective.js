;(function() {
	'use strict';

	angular.module('dashboard')
	.directive('adminTodo', function() {
		var controller;

		controller = function controller($scope) {

			var saveData;
			
			$scope.removeItem = function removeItem(item) {
				$scope.data.$remove(item);	
			};

			$scope.add = function add() {
				$scope.data.$add($scope.newTodo);
				$scope.newTodo = '';
			};

			$scope.save = function save() {
				$scope.data.forEach(function(item) {
					$scope.data.$save(item);
				});
			};

		};

		return {
			restrict: 'E',
			scope: {
				data: '='
			},
			templateUrl: 'views/adminTodoDirective.html',
			controller: controller,
			transclude: true
		};
	});
})();