describe('d3Service', function() {
	'use strict';

    var d3Service;

    beforeEach(module('dashboard'));

    beforeEach(inject(function(_d3Service_) {
    	d3Service = _d3Service_;
    }));

    it('should exist', function() {
    	expect(d3Service).toBeDefined();
    });
});