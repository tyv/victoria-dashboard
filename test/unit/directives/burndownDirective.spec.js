describe('burndown', function() {
	'use strict';

	var $rootScope,
		scope,
		$compile,
		elem,
		burndownData;

	beforeEach(module('dashboard'));

	beforeEach(module('burndownDirective.html'))

	beforeEach(inject(function(_$rootScope_, _$compile_) {
		$rootScope = _$rootScope_;
        scope = $rootScope.$new();
        $compile = _$compile_;
        elem = '<burndown data="burndownData" width="500", height="500">Burndown</burndown>';
        $compile(elem)(scope);
        scope.$digest();
	}));

	//TODO - figure out a way to get the templates working here
});