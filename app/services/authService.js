;(function() {
	'use strict';
	angular.module('dashboard')
	.factory('authService', function authService(FIREBASE_URL, $q, firebaseService) {

		var service,
			Firebase = firebaseService,
			ref = new Firebase(FIREBASE_URL),
			user = {};

		function login(email, password) {
			var deferred = $q.defer();

			ref.authWithPassword({
				email: email,
				password: password
			}, function(err) {
				if(err) {
					deferred.reject(err);
				} else {
					deferred.resolve('Logged in');
				}
			});

			return deferred.promise;
		}

		function logout() {
			ref.unauth();
		}

		function signedIn() {
			if(user.provider) {
				return true;
			} else {
				return false;
			}
		}

		//catch auth
		ref.onAuth(function(authObj) {
			if(authObj) {
				angular.copy(authObj, user);
			} else {
				angular.copy({}, user);
			}
		});

		service = {
			login: login,
			logout: logout,
			signedIn: signedIn,
			user: user
		};

		return service;

	});
})();