;(function() {
	'use strict';
	angular.module('dashboard')
	.factory('authService', function authService(FIREBASE_URL, $q, firebaseService, $firebaseAuth) {

		var service,
			Firebase = firebaseService,
			ref = new Firebase(FIREBASE_URL),
			auth = $firebaseAuth(ref),
			user = {};

		function login(email, password) {
			return auth.$authWithPassword({
				email: email,
				password: password
			});
		}

		function logout() {
			auth.$unauth();
		}

		function signedIn() {
			return auth.$requireAuth();
		}

		function waitForAuth() {
			return auth.$waitForAuth();
		}

		service = {
			login: login,
			logout: logout,
			signedIn: signedIn,
			waitForAuth: waitForAuth,
			user: user
		};

		return service;

	});
})();