;(function() {
	'use strict';

	angular.module('dashboard')
	.directive('adminSatisfaction', function(notifyService) {
		var controller,
			notify = notifyService;

		controller = function controller($scope) {
			$scope.save = function save() {
				if($scope.satisfaction.$dirty) {
					$scope.data.$save()
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
			templateUrl: 'views/adminSatisfactionDirective.html',
			controller: controller,
			transclude: true
		};
	});
})();