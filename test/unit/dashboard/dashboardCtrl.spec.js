describe('accountLoginCtrl', function() {
	'use strict';

    var createController, 
        $rootScope, 
        $state,
        deferred, 
        scope;

    beforeEach(module('dashboard'));

    beforeEach(inject(function($controller, _$rootScope_, $q) {
        $rootScope = _$rootScope_;
        scope = $rootScope.$new();
        deferred = $q.defer();


        createController = function() {
            return $controller('dashboardCtrl');
        };

        vm = createController();

        //Spys

    }));

    

});