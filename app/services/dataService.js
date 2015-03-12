;(function() {
	'use strict';
	angular.module('dashboard')
	.factory('dataService', function dataService(FIREBASE_URL, $firebaseObject, $firebaseArray, firebaseService) {
		var service,
			Firebase = firebaseService,
			ref = new Firebase(FIREBASE_URL);

		function getData(name, type) {
			type = type || 'object';
			if(type === 'object') {
				return $firebaseObject(ref.child(name));
			} else if(type === 'array') {
				return $firebaseArray(ref.child(name));
			}
		} 

		service = {
			getData: getData
		};

		return service;
		
	});
})();