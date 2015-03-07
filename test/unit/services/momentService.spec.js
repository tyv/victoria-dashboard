describe('momentService', function() {
	'use strict';

    var momentService;

    beforeEach(module('dashboard'));

    beforeEach(inject(function(_momentService_) {
    	momentService = _momentService_;
    }));

    it('should exist', function() {
    	expect(momentService).toBeDefined();
    });
});