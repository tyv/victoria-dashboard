;(function() {
	'use strict';

	angular.module('dashboard')
	.directive('adminBurndown', function(momentService) {
		var controller;

		controller = function controller($scope) {
			var moment = momentService,
				createDays,
				endDateIsBeforeStartDate,
				numberOfDaysInSprint,
				saveData,
				getNameOfDay,
				calculateRemaining;

			$scope.dateChange = function dateChange() {
				if(endDateIsBeforeStartDate()) {
					$scope.data.endDate = null;
				}
			};

			$scope.newBurndown = function newBurndown() {
				var diff = numberOfDaysInSprint();

				//create new days
				$scope.data.days = createDays(diff);
				saveData();
			};

			$scope.dayChange = function dayChange() {
				saveData();
			};

			$scope.updateTotal = function updateTotal() {
				$scope.data.remaining = calculateRemaining();
			};

			saveData = function saveData() {
				$scope.data.remaining = calculateRemaining();
				$scope.data.$save()
				.then(function() {
					console.log('saved');
				})
				.catch(function() {
					console.log('problem saving the data');
				});
			};

			calculateRemaining = function calculateRemaining() {
				var total = 0;
				$scope.data.days.forEach(function(day) {
					total += day.qty;
				});
				return total;
			};

			createDays = function createDays(differenceInDays) {
				var days = [],
					i = 1,
					num = differenceInDays + 2,
					date;

				if(differenceInDays < 1) {
					//Clear the days if the dates are the same
					return [];
				}

				days.push({
					date: moment($scope.data.startDate).subtract(1, 'days').format('YYYY-MM-DD'),
					qty: 0,
					num: 0,
					editable: false
				});

				for (; i < num; i++) {
					//don't add weekends
					date = moment(days[0].date).add(i, 'days');
					if(date.day() !== 0 && date.day() !== 6) {
						days.push({
							date: date.format('YYYY-MM-DD'),
							qty: '',
							num: days.length,
							editable: true,
							name: getNameOfDay(date.day())
						});
					}
				}
				return days;
			};

			numberOfDaysInSprint = function numberOfDaysInSprint() {
				return Math.abs(moment($scope.data.startDate).diff($scope.data.endDate, 'days'));
			};

			endDateIsBeforeStartDate = function endDateIsBeforeStartDate() {
				return moment($scope.data.endDate).isBefore($scope.data.startDate);
			};

			getNameOfDay = function(num) {
				var days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
				return days[num];
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