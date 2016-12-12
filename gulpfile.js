var gulp = require('gulp');
var postcss = require('gulp-postcss');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var cleanCSS = require('gulp-clean-css');
var browserSync = require('browser-sync');

var autoprefixer = require('autoprefixer');



// 编译Sass
gulp.task('sass', function() {
    gulp.src('./scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./dist'));
});


//postcss
gulp.task('postcss', function() {
    var processors = [autoprefixer({
        browsers: [
            "Android 2.3",
            "Android >= 4",
            "Chrome >= 20",
            "Firefox >= 24",
            "Explorer >= 8",
            "iOS >= 6",
            "Opera >= 12",
            "Safari >= 6"
        ]
    })];
    return gulp.src('./dist/*.css')
        .pipe(postcss(processors))
        .pipe(cleanCSS())
        .pipe(gulp.dest('./css'));
});


//css
gulp.task('css', function() {
    gulp.run('sass', 'postcss');
});



gulp.task('js', function() {
    gulp.src([
            './js/vendor/jquery-3.1.1.min.js',
            './js/vendor/holder-2.9.min.js',
            './js/vendor/masonry.4.1.1.min.js',
            './venders/bootstrap-sass-3.3.7/assets/javascripts/bootstrap.min.js'
        ])
        .pipe(concat('all.js'))
        .pipe(gulp.dest('./js'))
        .pipe(rename('all.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./js'));
});

gulp.task('browser-sync', function() {
    var files = [
        './**/*.html',
        'css/main.css',
        'img/**/*.png',
        'js/all.min.js'
    ];

    browserSync.init(files, {
        server: {
            baseDir: './'
        }
    });
});


// 默认任务
gulp.task('default', function() {
    gulp.run('css', 'js', 'browser-sync');

    // 监听文件变化
    gulp.watch(['./js/main.js', './js/plugins.js', './scss/**/*.scss'], function() {
        gulp.run('css', 'js');
    });
});


