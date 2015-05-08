;(function() {
	'use strict';
	angular.module('dashboard')
	.controller('loginCtrl', function loginCtrl(authService, $state, notifyService) {
		var vm = this,
			notify = notifyService;

		vm.loading = false;

		vm.signin = function signin(valid) {
			vm.loading = true;
			authService.login(vm.email, vm.password)
			.then(function() {
				vm.loading = false;
				$state.go('dashboard');
			})
			.catch(function(msg) {
				notify.alert(msg.message);
				vm.loading = false;
			});
		};

	});
})();