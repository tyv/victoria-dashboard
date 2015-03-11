;(function() {
	'use strict';
	angular.module('dashboard')
	.controller('loginCtrl', function loginCtrl(authService, $state) {
		var vm = this;

		vm.signin = function signin(valid) {
			authService.login(vm.email, vm.password)
			.then(function() {
				$state.go('dashboard');
			})
			.catch(function(msg) {
				console.log(msg);
			});
		};

	});
})();