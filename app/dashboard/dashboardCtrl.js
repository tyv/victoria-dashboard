;(function() {
	'use strict';
	angular.module('dashboard')
	.controller('dashboardCtrl', function dashboardCtrl(dataService) {
		var vm = this;

		vm.burndownData = dataService.getData('burndown', 'object');
		vm.todoData = dataService.getData('todo', 'array');
		vm.npsData = dataService.getData('nps', 'object');
	});

})();