;(function() {
	'use strict';
	angular.module('dashboard')
	.factory('dataService', function dataService(FIREBASE_URL, $firebaseObject) {
		var service,
			ref = new Firebase(FIREBASE_URL);

		function getData(name) {
			return $firebaseObject(ref.child(name));
		} 

		service = {
			getData: getData
		};

		return service;
		
	});
})();