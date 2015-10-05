;(function(){
    'use strict';

    var gulp        = require('gulp'),
        browserSync = require('browser-sync'),
        reload      = browserSync.reload,
        sass        = require('gulp-sass'),
        concat      = require('gulp-concat'),
        ngAnnotate  = require('gulp-ng-annotate'),
        uglify      = require('gulp-uglify'),
        minifyHtml  = require('gulp-minify-html'),
        flatten     = require('gulp-flatten'),
        sourceMaps  = require('gulp-sourcemaps'),
        plumber     = require('gulp-plumber'),
        //karma       = require('karma').server,
        modRewrite  = require('connect-modrewrite'),
        paths;

    paths = {
        js : [
            'node_modules/angular/angular.js',
            'node_modules/ui-router/angular-ui-router.js',
            'node_modules/d3/d3.js',
            'bower_components/firebase/firebase.js',
            'bower_components/moment/moment.js',
            'node_modules/angularfire/dist/angularfire.js',
            'bower_components/angular-fontawesome/dist/angular-fontawesome.js',
            'app/main.js',
            'app/**/*.js'
        ],
        testing: [
            'node_modules/angular-mocks/angular-mocks.js',
            'test/unit/**/*.js',
            'app/**/*.html'
        ]
    };


    // Default task to be run with `gulp`
    gulp.task('default', ['fonts', 'images', 'views', 'styles', 'js', 'browser-sync'], function () {
        gulp.watch(['app/main.js', 'app/**/*.js'], ['js']);
            // Watch our scss files
            gulp.watch(['app/main.scss', 'app/**/*.scss'], [
                'styles'
            ]);

            gulp.watch(['app/index.html', 'app/**/*.html'], [
                'views'
            ]);
    });

    gulp.task('fonts', function() {
        //copy fonts
        gulp.src('bower_components/font-awesome/fonts/*')
        .pipe(gulp.dest('public/fonts/'));
    });

    gulp.task('images', function() {
        //copy fonts
        gulp.src('app/images/*')
        .pipe(gulp.dest('public/images/'));
    });

    // browser-sync task for starting the server.
    gulp.task('browser-sync', ['fonts', 'views', 'styles', 'js'], function() {
        browserSync({
            server: {
                baseDir: './public',
                ghostMode: false,
                middleware: [
                    modRewrite([
                        '!\\.html|\\.js|\\.css|\\.png|\\.woff2|\\.eot|\\.svg|\\.ttf|\\.otf|\\.woff$ /index.html [L]'
                    ])
                ]
            }
        });
    });

    // Styles
    gulp.task('styles', function () {
        return gulp.src('app/main.scss')
            .pipe(sourceMaps.init())
            .pipe(plumber())
            .pipe(sass({
                errorLogToConsole: true
            }))
            .pipe(sourceMaps.write())
            .pipe(gulp.dest('public/'))
            .pipe(reload({stream:true}));
    });

    //JS
    gulp.task('js', function() {
        return gulp.src(paths.js)
            .pipe(plumber())
            .pipe(sourceMaps.init())
            .pipe(concat('app.js'))
            .pipe(sourceMaps.write())
            .pipe(gulp.dest('public/'))
            .pipe(reload({stream:true}));
    });

    //Views
    gulp.task('views', function() {
        // Get our index.html
        gulp.src('app/index.html')
            .pipe(plumber())
            // And put it in the public folder
            .pipe(gulp.dest('public/'))
            .pipe(reload({stream:true}));

            // Any other view files from app/views
            gulp.src(['app/**/*.html'])
            // Will be put in the public/views folder
            .pipe(flatten())
            .pipe(gulp.dest('public/views/'))
            .pipe(reload({stream:true}));
    });

    gulp.task('dist', [ 'fonts', 'images', 'dist-views', 'dist-styles', 'dist-js'], function() {

    });

    gulp.task('dist-styles', function() {
        gulp.src('app/main.scss')
        .pipe(sass({
            outputStyle: 'compressed'
        }))
        .pipe(gulp.dest('public/'));
    });

    gulp.task('dist-js', function() {
        gulp.src(paths.js)
        .pipe(concat('app.js'))
        .pipe(ngAnnotate())
        .pipe(uglify({
            mangle: false
        }))
        .pipe(gulp.dest('public/'));
    });

    gulp.task('dist-views', function() {
        gulp.src('app/index.html')
        .pipe(gulp.dest('public/'));

        gulp.src(['app/**/*.html'])
        .pipe(flatten())
        .pipe(minifyHtml())
        .pipe(gulp.dest('public/views/'));
    });

    //NOTE - run karma from command line for now!!
    //
    //
    // gulp.task('karma', function(done) {
    //     karma.start({
    //         configFile: __dirname + '/karma.conf.js'
    //     }, done);
    // });
})();