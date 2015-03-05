describe('dataService', function() {
	'use strict';

    var dataService,
    	$firebaseObject;

    beforeEach(module('dashboard'));

    beforeEach(function() {
    	module(function($provide) {
    		$provide.value('$firebaseObject', function FirebaseObject(ref) {
    				return {name: ref};
    		});
    		window.Firebase = function(url) {
    			return {
    				child: function(name) {
    					return name;
    				}
    			};
    		};
    	});
    });

    beforeEach(inject(function(_dataService_, _$firebaseObject_) {
    	dataService = _dataService_;
    	$firebaseObject = _$firebaseObject_;
    }));

    it('should get the correct data from firebase', function() {
    	var responce = dataService.getData('burndown');
    	expect(responce).not.toEqual({name: 'todo'});
    	expect(responce).toEqual({name: 'burndown'});
    });
});