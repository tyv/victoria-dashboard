;(function() {
	'use strict';
	angular.module('dashboard')
	.factory('momentService', function momentService() {
		return window.moment;
	});
})();