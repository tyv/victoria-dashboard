;(function() {
	'use strict';

	angular.module('dashboard')
	.directive('adminTodo', function($q, notifyService) {
		var controller,
			notify = notifyService;

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
						notify.success('Saved');
					})
					.catch(function() {
						notify.alert('Error saving!');
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