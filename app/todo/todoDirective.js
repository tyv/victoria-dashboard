;(function() {
	'use strict';

	angular.module('dashboard')
	.directive('todo', function() {
		return {
			restrict: 'E',
			scope: {
				data: '='
			},
			templateUrl: 'views/todoDirective.html',
			//controller: controller,
			transclude: true
		};
	});
})();