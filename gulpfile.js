var gulp = require('gulp');
var less = require('gulp-less');
var browserSync = require('browser-sync');
var cssnano = require('gulp-cssnano');
var rename = require('gulp-rename');
var autoprefixer = require('gulp-autoprefixer');

gulp.task('less', function () {
   return gulp.src('app/less/**/*.less')
       .pipe(less())
       .pipe(autoprefixer(['last 15 version', '>1%', 'ie 8', 'ie 7'],{cascade: true}))
       .pipe(gulp.dest('public/stylesheets'))
       .pipe(browserSync.reload({stream: true}))
});

gulp.task('browser-sync', function () {
   browserSync({
      server: {
          baseDir: 'app'
      },
       notify: false
   });
});

gulp.task('css-libs', ['less'], function () {
   return gulp.src('public/stylesheets/style.css')
       .pipe(cssnano())
       .pipe(rename({suffix: '.min'}))
       .pipe(gulp.dest('public/stylesheets'))
});

gulp.task('watch', ['browser-sync', 'css-libs'], function () {
    gulp.watch('app/less/**/*.less', ['less']);
    gulp.watch('views/*.pug', browserSync.reload);
});