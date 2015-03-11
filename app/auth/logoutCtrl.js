;(function() {
	'use strict';
	angular.module('dashboard')
	.controller('logoutCtrl', function logoutCtrl(authService, $state) {
		authService.logout();
		$state.go('login');
	});
})();