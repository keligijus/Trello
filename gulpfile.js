var gulp         = require('gulp');
var browserSync  = require('browser-sync');
var sass         = require('gulp-sass');
var sourcemaps   = require('gulp-sourcemaps');
var concat       = require('gulp-concat');
var autoprefixer = require('gulp-autoprefixer');

// npm install gulp browserSync gulp-sass gulp-sourcemaps gulp-autoprefixer gulp-concat --save

var reload       = browserSync.reload;

var src = {
    scss: 'app/assets/css/*.scss',
    css:  'app/assets/css',
    html: 'app/*.html',
    js:   'app/assets/js/'
};

// Static Server + watching scss/js/html files
gulp.task('serve', ['sass'], function() {

    browserSync({
        server: "./app"
    });

    gulp.watch(src.js).on('change', reload);
    gulp.watch(src.html).on('change', reload);
});

// Compile SASS into CSS
gulp.task('sass', function() {
    return gulp.src(src.scss)
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions']
        }))
        .pipe(concat('style.css'))
        .pipe(gulp.dest(src.css))
        .pipe(reload({stream: true}));
});

gulp.task('default', ['serve']);
