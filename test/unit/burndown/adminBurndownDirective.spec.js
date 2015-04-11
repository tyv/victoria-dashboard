describe('adminBurndown', function() {
	'use strict';

	var $rootScope,
		scope,
		$compile,
		elem,
		firebaseData,
		$body,
		dscope;

		beforeEach(function() {
			module('dashboard');
			module('views/adminBurndownDirective.html');
			module('views/burndownDirective.html');
			module('views/dashboard.html');
			module('views/login.html');
			// module('templates');

			inject(function($rootScope, $compile) {
		        scope = $rootScope;

		        elem = angular.element('<admin-burndown data="admin.burndownData"><h2>Burndown</h2></admin-burndown>');
		        firebaseData = {
		        	startDate: '2015-03-18',
		        	endDate: '2015-03-20',
		        	goal: 40,remaining: 38,
		        	days: [{date: '2015-03-17', done: 0, editable: false, num: 0, qty: 0, remaining: 40
		        		},
		        		{date: '2015-03-18', done: 1, editable: true, num: 1, qty: 1, remaining: 39
		        		},
		        		{date: '2015-03-19', done: 2, editable: true, num: 2,qty: 1,remaining: 38}],
		        	$loaded: function(cb){
		        		cb(scope.burndownData);
		        	}
		        };

		        scope.burndownData = firebaseData;

		        $compile(elem)(scope);
		        scope.$digest();
		        dscope = elem.isolateScope();
			});

		});


	it('should build a graph', function() {
		//console.log(dscope.burndownData);
	});

});