;(function() {
	'use strict';
	angular.module('dashboard')
	.factory('dataService', function dataService(FIREBASE_URL, $firebaseObject, $firebaseArray, firebaseService) {
		var service,
			Firebase = firebaseService,
			ref = new Firebase(FIREBASE_URL),
			fbEntities = [];

		service = {
			getData: getData,
			destroy: destroy
		};

		return service;

		function getData(name, type) {
			var entity;
			type = type || 'object';
			if(type === 'object') {
				entity = $firebaseObject(ref.child(name));
			} else if(type === 'array') {
				entity = $firebaseArray(ref.child(name));
			}
			fbEntities.push(entity);
			return entity;
		} 

		function destroy() {
			fbEntities.forEach(function(entity) {
				entity.$destroy();
			});
		}

		
	});
})();