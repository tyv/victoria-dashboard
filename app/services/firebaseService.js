;(function() {
	'use strict';
	angular.module('dashboard')
	.factory('firebaseService', function firebaseService() {
		return window.Firebase;
	});
})();