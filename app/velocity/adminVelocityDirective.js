;(function() {
	'use strict';

	angular.module('dashboard')
	.directive('adminVelocity', function(momentService, notifyService) {
		var controller,
			moment = momentService,
			notify = notifyService;

		controller = function controller($scope) {

			var saveData,
				calculateCurrent,
				calculateAverage;

			calculateCurrent = function calculateCurrent() {
				var newest = '1977-01-01',
					currentDate,
					currentVelocity = 0;

				$scope.data.velocities.forEach(function(velocity) {
					currentDate = moment(velocity.date);
					if(currentDate.isAfter(newest)) {
						newest = currentDate.format('YYYY-MM-DD');
						currentVelocity = velocity;
					}
				});
				return currentVelocity;
			};

			calculateAverage = function calculateAverage() {
				var amt,
					total,
					average;

				amt = $scope.data.velocities.length;

				if(amt === 0) {
					return 0;
				} else if(amt === 1) {
					total = $scope.data.velocities[0].score;
				} else {
					total = $scope.data.velocities
					.map(function(velocity) {
						return velocity.score;
					})
					.reduce(function(a, b) {
						return a + b;
					});
				}
				average = total / amt;
				return Math.floor(average);
			};

			saveData = function saveData() {
				$scope.data.currentVelocity = calculateCurrent();
				$scope.data.averageVelocity = calculateAverage();
				$scope.data.$save()
				.then(function() {
					notify.success('Saved');
				})
				.catch(function() {
					notify.alert('Error saving!');
				});
			};

			$scope.removeItem = function removeItem(item) {
				$scope.data.velocities = $scope.data.velocities.filter(function(velocity) {
					return velocity !== item;
				});
				
				saveData();
			};
			

			$scope.add = function add() {
				if(!$scope.data.velocities) {
					$scope.data.velocities = [];
				}
				$scope.data.velocities.push({
					date: $scope.date,
					score: $scope.score
				});
				saveData();
				
				$scope.date = '';
				$scope.score = '';
			};

			$scope.save = function save() {
				if($scope.velocity.$dirty) {
					saveData();
				}
			};
		};

		return {
			restrict: 'E',
			scope: {
				data: '='
			},
			templateUrl: 'views/adminVelocityDirective.html',
			controller: controller,
			transclude: true
		};
	});
})();