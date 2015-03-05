;(function() {
	'use strict';

	angular.module('dashboard', ['ui.router', 'firebase'])
	.constant('FIREBASE_URL', 'https://victoria-dashboard.firebaseio.com/')
	.config(function($stateProvider, $urlRouterProvider, $locationProvider) {

		$locationProvider.html5Mode(true);
		$urlRouterProvider.otherwise('/');

		$stateProvider
			.state('dashboard', {
				url: '/',
				templateUrl: 'views/dashboard.html',
				controller: 'dashboardCtrl as dashboard'
			});

	});
})();
