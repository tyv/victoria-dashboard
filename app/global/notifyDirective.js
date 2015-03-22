;(function() {
	'use strict';
	angular.module('dashboard')
	.directive('notify', function(notifyService) {

		var linker,
			notify = notifyService;

		linker = function linker(scope) {
			scope.$watch(function(){
				return notify.message;
			}, function(newValue) {
				scope.message = newValue.msg;
				scope.type = newValue.type;
				scope.success = (newValue.type === 'success' ? true : false);
				scope.alert = (newValue.type === 'alert' ? true : false);
			}, true);
		};

		return {
			restrict: 'E',
			link: linker,
			templateUrl: 'views/notifyDirective.html'
		};
	});
})();