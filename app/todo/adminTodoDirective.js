;(function() {
	'use strict';

	angular.module('dashboard')
	.directive('adminTodo', function($q, notifyService) {
		var controller,
			notify = notifyService;

		controller = function controller($scope) {
			
			$scope.removeItem = function removeItem(item) {
				$scope.data.todos = $scope.data.todos.filter(function(value){
					return value.$$hashKey !== item.$$hashKey;
				});
				$scope.data.$save();
			};

			$scope.toggleDone = function toggleDone(item) {
				$scope.data.todos.forEach(function(currentValue){
					if(currentValue.$$hashKey === item.$$hashKey){
						currentValue.done = !currentValue.done;
					}
				});
				$scope.data.$save();
			};

			$scope.add = function add() {
				if(!$scope.data.todos) {
					$scope.data.todos = [];
				}
				$scope.data.todos.push({
					task: $scope.newTask,
					done: false
				});
				$scope.data.$save();
				$scope.newTask = '';
			};

			$scope.save = function save() {
				if($scope.todos.$dirty) {
					$scope.data.$save();
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