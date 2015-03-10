;(function() {
	'use strict';

	angular.module('dashboard')
	.directive('adminTodo', function($q) {
		var controller;

		controller = function controller($scope) {
			
			$scope.removeItem = function removeItem(item) {
				$scope.data.$remove(item);	
			};

			$scope.add = function add() {
				$scope.data.$add($scope.newTodo);
				$scope.newTodo = '';
			};

			$scope.save = function save() {
				if($scope.todos.$dirty) {
					var promises = $scope.data.map(function(item) {
						return $scope.data.$save(item);
					});

					$q.all(promises)
					.then(function() {
						console.log('saved');
					})
					.catch(function(e) {
						console.log(e);
					});
				}	
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