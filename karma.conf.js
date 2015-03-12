module.exports = function(config){
    'use strict';
    config.set({

        basePath : __dirname,

        autoWatch : true,

        frameworks: ['jasmine-jquery', 'jasmine'],

        browsers : ['Chrome'],

        preprocessors: {
            'public/**/*.html': ['ng-html2js']
        },

        ngHtml2JsPreprocessor: {
           stripPrefix: 'public/'
        },

        files: [
            'bower_components/jquery/dist/jquery.js',
            'node_modules/angular/angular.js',
            'node_modules/ui-router/angular-ui-router.js',
            'node_modules/d3/d3.js',
            'bower_components/firebase/firebase.js',
            'bower_components/moment/moment.js',
            'node_modules/angularfire/dist/angularfire.js',
            'bower_components/angular-animate/angular-animate.js',
            'bower_components/angular-toastr/dist/angular-toastr.tpls.js',
            'bower_components/angular-fontawesome/dist/angular-fontawesome.js',
            'app/main.js',
            'app/**/*.js',
            'node_modules/angular-mocks/angular-mocks.js',
            'test/unit/**/*.js',
            'public/**/*.html'
        ]
    });
};
