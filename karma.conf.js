module.exports = function(config){
    'use strict';
    config.set({

        basePath : '../',

        autoWatch : true,

        frameworks: ['jasmine-jquery', 'jasmine'],

        browsers : ['Chrome'],

        preprocessors: {
            'views/**/*.html': 'ng-html2js'
        },

        // ngHtml2JsPreprocessor: {
        //    moduleName: 'templates'
        // },

        files: [
            'views/**/*.html'
        ]
    });
};
