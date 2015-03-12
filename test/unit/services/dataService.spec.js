describe('dataService', function() {
	'use strict';

    var dataService,
    	$firebaseObject,
        $firebaseArray,
        firebaseService;

    beforeEach(module('dashboard'));

    beforeEach(function() {
    	module(function($provide) {
    		$provide.value('$firebaseObject', function FirebaseObject(ref) {
    				return {type: '$firebaseObject', name: ref.name};
    		});
    		$provide.value('$firebaseArray', function FirebaseObject(ref) {
                    return {type: '$firebaseArray', name: ref.name};
            });
            $provide.value('firebaseService', function Firebase(url) {
                    return {
                        child: function(name) {
                            return {
                                name: name,
                                url: url
                            };
                        },
                        onAuth: function() {}
                    };
            });
    	});
    });

    beforeEach(inject(function(_dataService_, _$firebaseObject_, _$firebaseArray_, _firebaseService_) {
    	dataService = _dataService_;
    	$firebaseObject = _$firebaseObject_;
        $firebaseArray = _$firebaseArray_;
        firebaseService = _firebaseService_;
    }));

    it('should get the correct firebase object', function() {
    	var responce = dataService.getData('burndown', 'object');
        expect(responce).not.toEqual({type: '$firebaseArray', name: 'burndown'});
    	expect(responce).toEqual({type: '$firebaseObject', name: 'burndown'});
    });

    it('should get the correct firebase array', function() {
        var responce = dataService.getData('todo', 'array');
        expect(responce).not.toEqual({type: '$firebaseObject', name: 'todo'});
        expect(responce).toEqual({type: '$firebaseArray', name: 'todo'});
    });

    it('should default to object', function() {
        var responce = dataService.getData('burndown');
        expect(responce).toEqual({type: '$firebaseObject', name: 'burndown'});
    });

});