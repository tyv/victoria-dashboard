;(function() {
	'use strict';

	angular.module('dashboard', ['ui.router', 'firebase', 'picardy.fontawesome'])
	.constant('FIREBASE_URL', 'https://victoria-dashboard.firebaseio.com/')
	.config(function($stateProvider, $urlRouterProvider, $locationProvider) {

		$locationProvider.html5Mode(true);
		$urlRouterProvider.otherwise('/');

		var checkAuth = {
			currentAuth: function(authService) {
				return authService.signedIn();
			}
		};

		var waitForAuth = {
			currentAuth: function(authService) {
				return authService.waitForAuth();
			}
		};

		$stateProvider
			.state('login', {
				url: '/login',
				templateUrl: 'views/login.html',
				controller: 'loginCtrl as login',
				resolve: waitForAuth
			})
			.state('logout', {
				controller: 'logoutCtrl'
			})
			.state('dashboard', {
				url: '/',
				templateUrl: 'views/dashboard.html',
				controller: 'dashboardCtrl as dashboard',
				resolve: checkAuth
			})
			.state('admin', {
				url: '/admin',
				templateUrl: 'views/admin.html',
				controller: 'adminCtrl as admin',
				resolve: checkAuth
			});
	})
	.run(function($rootScope, $state) {
		$rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error) {
			if(error === 'AUTH_REQUIRED') {
				return $state.go('login');
			}
		});
	});
})();
