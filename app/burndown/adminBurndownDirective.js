;(function() {
	'use strict';

	angular.module('dashboard')
	.directive('adminBurndown', function(momentService, notifyService) {
		var controller,
			notify = notifyService;

		controller = function controller($scope) {
			var createNewDaysGroup,
				saveData,
				checkGoal,
				updateDays,
				createDays,
				calculateRemaining;

			$scope.newBurndown = function newBurndown() {
				//create new days
				$scope.data.days = createNewDaysGroup($scope.data.numDays);
				saveData();
			};

			$scope.updateTotal = function updateTotal() {
				$scope.data.remaining = calculateRemaining();
				$scope.data.goal = checkGoal();
			};

			$scope.save = function save() {
				saveData();
			};

			saveData = function save() {
				$scope.data.goal = checkGoal();
				$scope.data.days = updateDays();
				$scope.data.remaining = calculateRemaining();

				$scope.data.$save()
				.then(function() {
					notify.success('Saved');
				})
				.catch(function() {
					notify.alert('Error saving!');
				});
			};

			calculateRemaining = function calculateRemaining() {
				var total = 0;

				$scope.data.days.forEach(function(day) {
					total += day.qty;
				});
				return total;
			};

			createNewDaysGroup = function createNewDaysGroup(numDays) {
				var days = [];

				if(numDays < 1) {
					//Clear the days if numDays is 0
					return days;
				}

				days.push({
					qty: 0,
					num: 0,
					editable: false
				});

				days = createDays(days, numDays);

				return days;
			};

			createDays = function createDays(currentDaysArr, num) {
				var days = currentDaysArr,
					i = 0,
					additional = parseInt(num) || 0;

				if(!Array.isArray(days)) {
					throw 'Need to pass in array as first argument';
				}

				for (; i < additional; i++) {
					days.push({
						qty: '',
						num: days.length,
						editable: true
					});
				}
				return days;
			};

			updateDays = function updateDays(){
				var diff,
					days,
					currentNumDays,
					totalNumDays;

				days = $scope.data.days,
				currentNumDays = $scope.data.days.length,
				totalNumDays = $scope.data.numDays + 1;

				if(currentNumDays > totalNumDays) {
					diff = currentNumDays - totalNumDays;
					days = days.slice(0, totalNumDays);
				} else if(currentNumDays < totalNumDays) {
					diff = totalNumDays - currentNumDays;
					days = createDays(days, diff);
				}
				return days;
			};

			checkGoal = function checkGoal() {
				return $scope.data.goal || 0;
			};

		};

		return {
			restrict: 'E',
			scope: {
				data: '='
			},
			templateUrl: 'views/adminBurndownDirective.html',
			controller: controller,
			transclude: true
		};
	});
})();