;(function() {
	'use strict';

	angular.module('dashboard')
	.directive('nps', function() {

		return {
			restrict: 'E',
			scope: {
				data: '=',
				npsTotalData: '='
			},
			templateUrl: 'views/npsDirective.html',
			transclude: true
		};
	});
})();