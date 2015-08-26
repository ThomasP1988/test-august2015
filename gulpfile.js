var gulp = require('gulp');
var mainBowerFiles = require('main-bower-files');
var concat = require('gulp-concat');

var config = {
    bowerDir: './bower_components',
    source: './src',
    application: './app'
}


gulp.task('default', function () {
    return gulp.start('jsLib')
        .start('jsApp')
        .start('css')
        .start('fonts')
        .start('html')
        .start('images')
        ;
});

gulp.task('jsLib', function () {
    var jsLibs = [
        config.bowerDir + '/jquery-ui/ui/jquery.ui.js' ,
        config.bowerDir + '/jquery-ui/ui/jquery.ui.slider.js' ,
        config.bowerDir + '/angular-ui-slider/src/slider.js',
        config.bowerDir + '/angular-ui-router/release/angular-ui-router.js'
    ];

    return gulp.src(jsLibs)
        .pipe(concat('lib.js'))
        .pipe(gulp.dest(config.source + '/js/lib'))
        ;
});

gulp.task('jsApp', function () {
    return gulp.src(config.application + '/*/**.js')
        .pipe(concat('app.js'))
        .pipe(gulp.dest(config.source + '/js/app'))
        ;
});

gulp.task('css', function () {
    return gulp.src(
        [
            config.bowerDir + '/bootstrap/dist/css/bootstrap.min.css',
            config.application + '/css/**.*',
            config.bowerDir + '/jquery-ui/themes/base/jquery.ui.slider.css',
            config.bowerDir + '/jquery-ui/themes/base/jquery-ui.css'
        ])
        .pipe(concat('style.css'))
        .pipe(gulp.dest(config.source + '/css'));
});

gulp.task('fonts', function () {
    return gulp.src(config.bowerDir + '/bootstrap/dist/fonts/**.*')
        .pipe(gulp.dest(config.source + '/fonts'));
    ;
});

gulp.task('images', function () {
    return gulp.src(config.bowerDir + '/jquery-ui/themes/base/images/**.*')
        .pipe(gulp.dest(config.source + '/css/images'));
    ;
});

gulp.task('html', function () {
    return gulp.src([config.application + '/index.html', config.application + '/templates/**/**.*'])
        .pipe(concat('index.html'))
        .pipe(gulp.dest(config.source));
    ;
});