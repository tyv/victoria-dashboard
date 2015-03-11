;(function() {
	'use strict';

	angular.module('dashboard', ['ui.router', 'firebase', 'picardy.fontawesome'])
	.constant('FIREBASE_URL', 'https://victoria-dashboard.firebaseio.com/')
	.config(function($stateProvider, $urlRouterProvider, $locationProvider) {

		$locationProvider.html5Mode(true);
		$urlRouterProvider.otherwise('/');

		$stateProvider
			.state('login', {
				url: '/login',
				templateUrl: 'views/login.html',
				controller: 'loginCtrl as login'
			})
			.state('logout', {
				controller: 'logoutCtrl'
			})
			.state('dashboard', {
				url: '/',
				templateUrl: 'views/dashboard.html',
				controller: 'dashboardCtrl as dashboard'
			})
			.state('admin', {
				url: '/admin',
				templateUrl: 'views/admin.html',
				controller: 'adminCtrl as admin'
			});
	})
	.run(function($rootScope, authService, $location) {
		$rootScope.$on('$stateChangeStart', function (ev, to) {
			if(to.name === 'dashboard' || to.name === 'admin') {
				if(!authService.signedIn()) {
					$location.path('/login');
				}
			}
			if(to.name === 'login' && authService.signedIn()) {
				$location.path('/dashboard');
			}
		});
	});
})();
