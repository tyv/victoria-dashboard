describe('burndown', function() {
	'use strict';

	var $rootScope,
		scope,
		$compile,
		elem,
		firebaseData,
		d3,
		$body;

		beforeEach(function() {
			module('dashboard');
			module('views/burndownDirective.html')

			inject(function(_$rootScope_, _$compile_, _d3Service_) {
				$rootScope = _$rootScope_;
		        scope = $rootScope.$new();
		        $compile = _$compile_;
		        d3 = _d3Service_;

		        elem = angular.element('<burndown data="burndownData" width="500", height="500">Burndown</burndown>');
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
			});

		});


	it('should build a graph', function() {
		var svg = elem.find('svg.burndown-vis');
		expect(svg).toExist();
	});

});