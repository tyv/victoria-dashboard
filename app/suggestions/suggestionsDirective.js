;(function() {
	'use strict';

	angular.module('dashboard')
	.directive('suggestions', function() {
		return {
			restrict: 'E',
			scope: {
				data: '='
			},
			templateUrl: 'views/suggestionDirective.html',
			transclude: true
		};
	});
})();