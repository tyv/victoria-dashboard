describe('lineGraph', function() {
	'use strict';

	var $rootScope,
		scope,
		$compile;

	beforeEach(module('dashboard'));

	beforeEach(inject(function(_$rootScope_, _$compile_) {
		$rootScope = _$rootScope_;
        scope = $rootScope.$new();
        $compile = _$compile_;
	}));
});