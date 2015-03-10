;(function() {
	'use strict';
	angular.module('dashboard')
	.controller('adminCtrl', function adminCtrl(dataService) {
		var vm = this;

		//Burndown
		vm.burndownData = dataService.getData('burndown', 'object');

		//Todo
		vm.todoData = dataService.getData('todo', 'array');

		//Velocity
		vm.velocityData = dataService.getData('velocity', 'object');

		// Satisfaction
		vm.satisfactionData = dataService.getData('satisfaction', 'object');

		// Nps
		vm.npsData = dataService.getData('nps', 'object');

	});

})();