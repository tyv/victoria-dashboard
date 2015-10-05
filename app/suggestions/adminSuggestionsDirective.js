;(function() {
	'use strict';

	angular.module('dashboard')
	.directive('adminSuggestions', function($q, notifyService) {
		var controller,
			notify = notifyService;

		controller = function controller($scope) {

			$scope.removeItem = function removeItem(item) {
				$scope.data.suggestions = $scope.data.suggestions.filter(function(value){
					return value.$$hashKey !== item.$$hashKey;
				});
				$scope.data.$save();
			};

			$scope.toggleSuggested = function toggleDone(item) {
				$scope.data.suggestions.forEach(function(currentValue){
					if(currentValue.$$hashKey === item.$$hashKey){
						currentValue.suggested = !currentValue.suggested;
					}
				});
				$scope.data.$save();
			};

			$scope.toggleAccepted = function toggleDone(item) {
				$scope.data.suggestions.forEach(function(currentValue){
					if(currentValue.$$hashKey === item.$$hashKey){
						currentValue.accepted = !currentValue.accepted;
					}
				});
				$scope.data.$save();
			};

			$scope.toggleImplemented = function toggleDone(item) {
				$scope.data.suggestions.forEach(function(currentValue){
					if(currentValue.$$hashKey === item.$$hashKey){
						currentValue.implemented = !currentValue.implemented;
					}
				});
				$scope.data.$save();
			};

			$scope.add = function add() {
				if(!$scope.data.suggestions) {
					$scope.data.suggestions = [];
				}
				$scope.data.suggestions.push({
					task: $scope.newTask,
					suggested: false,
					accepted: false,
					implemented: false,
					done: false
				});
				$scope.data.$save();
				$scope.newTask = '';
			};

			$scope.save = function save() {
				if($scope.suggestions.$dirty) {
					$scope.data.$save();
				}
			};
		};

		return {
			restrict: 'E',
			scope: {
				data: '='
			},
			templateUrl: 'views/adminSuggestionsDirective.html',
			controller: controller,
			transclude: true
		};
	});
})();