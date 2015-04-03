;(function() {
	'use strict';
	angular.module('dashboard')
	.controller('loginCtrl', function loginCtrl(authService, $state) {
		var vm = this;

		vm.loading = false;

		vm.signin = function signin(valid) {
			vm.loading = true;
			authService.login(vm.email, vm.password)
			.then(function() {
				vm.loading = false;
				$state.go('dashboard');
			})
			.catch(function(msg) {
				vm.loading = false;
			});
		};

	});
})();