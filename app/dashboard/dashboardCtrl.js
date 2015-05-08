;(function() {
	'use strict';
	angular.module('dashboard')
	.controller('dashboardCtrl', function dashboardCtrl(dataService) {
		var vm = this;

		vm.burndownData = dataService.getData('burndown', 'object');
		vm.todoData = dataService.getData('todo', 'object');
		vm.npsData = dataService.getData('nps', 'object');
		vm.satisfactionData = dataService.getData('satisfaction', 'object');
		vm.velocityData = dataService.getData('velocity', 'object');
	});

})();