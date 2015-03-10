;(function() {
	'use strict';

	angular.module('dashboard')
	.directive('adminNps', function($q) {
		var controller;

		controller = function controller($scope) {

			var calculateTotal;

			calculateTotal = function calculateTotal() {
				var numberOfCustomers = 0,
					promoters = 0,
					detractors = 0;

				$scope.data.customers.forEach(function(customer) {
					numberOfCustomers += 1;
					if(customer.score <= 6 ) {
						detractors += 1;
					} else if (customer.score >= 9) {
						promoters += 1;
					}
				});

				return Math.floor((promoters / numberOfCustomers) * 100 - (detractors / numberOfCustomers) * 100);
			};
			
			$scope.removeItem = function removeItem(item) {

				$scope.data.customers = $scope.data.customers.filter(function(customer) {
						return customer !== item;
				});
				
				$scope.data.$save()
				.then(function() {
					console.log('saved');
				});
			};
			

			$scope.add = function add() {
				if(!$scope.data.customers) {
					$scope.data.customers = [];
				}
				$scope.data.customers.push({
					score: $scope.score,
					name: $scope.name
				});
				$scope.data.$save();

			};

			$scope.save = function save() {
				if($scope.customers.$dirty) {
					$scope.data.score = calculateTotal();
					$scope.data.$save();
				}
			};

		};

		return {
			restrict: 'E',
			scope: {
				data: '='
			},
			templateUrl: 'views/adminNpsDirective.html',
			controller: controller,
			transclude: true
		};
	});
})();