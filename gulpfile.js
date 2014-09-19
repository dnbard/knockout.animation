var gulp = require('gulp'),
    browserify = require('gulp-browserify'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    less = require('gulp-less'),
    path = require('path'),
    minifyCSS = require('gulp-minify-css');

gulp.task('build-js', function() {
    gulp.src('src/ko.animate.js')
        .pipe(browserify({
            ignore: ['knockout']
        }))
        .pipe(gulp.dest('build'))
        .pipe(uglify())
        .pipe(rename('ko.animate.min.js'))
        .pipe(gulp.dest('build'));
});

gulp.task('build-less', function(){
    gulp.src('less/ko.animate.less')
        .pipe(less())
        .pipe(gulp.dest('build/'))
        .pipe(rename('ko.animate.min.css'))
        .pipe(minifyCSS({keepBreaks:true}))
        .pipe(gulp.dest('build/'));
});

gulp.task('dist', function(){
    gulp.src('build/*')
        .pipe(gulp.dest('dist'));
});

gulp.task('build', ['build-js', 'build-less']);

gulp.task('default', function(){
    function onChange(event) {
        console.log('File ' + event.path + ' was ' + event.type);
    }

    var jsWatcher = gulp.watch('src/**/*.js', ['build-js']);
    var lessWatcher = gulp.watch('less/**/*.less', ['build-less']);

    jsWatcher.on('change', onChange);
    lessWatcher.on('change', onChange);
});
