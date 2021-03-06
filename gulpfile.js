var gulp = require('gulp');
var webserver = require('gulp-webserver');
var uglify = require('gulp-uglify');
var cleanCSS = require('gulp-cleancss');
var responsive = require('gulp-responsive');


//webserver task
gulp.task('webserver', function(){
  //the directory is going to be named app
  gulp.src('app')
      .pipe(webserver({
        livereload: true,
        open: true,
        port: '3000'
      }));
});

//minify js files in the js directory
gulp.task('scripts', function(){
  gulp.src('app/js/*.js')
      .pipe(uglify())
      .pipe(gulp.dest('app/app.min.js'));
});

//minify css files in the css directory
gulp.task('clean-css', function(){
  gulp.src('app/css/*.css')
      .pipe(cleanCSS({compatibility: 'ie8'}))
      .pipe(gulp.dest('app/css/style.css.min'));
});

//task for responsive images images
gulp.task('images', function(){
  //
  return gulp.src('app/img/*.{jpg,png}')
              .pipe(responsive({
                '*': [{
                  width: 400,
                  rename: { suffix: '-small'},
                }, {
                  width: 640,
                  rename: { suffix: '-medium'},
                },{
                  width: 1600,
                  rename: { suffix: '-large'},
                }]
              }))
              .pipe(gulp.dest('app/img/'));
});

//watch for changes in the css and js files
gulp.task('watch', function(){
  gulp.watch('app/js/*.js', ['scripts'])
  gulp.watch('app/css/*.css', ['clean-css'])
});

//default task to run for the server
gulp.task('default', ['webserver', 'scripts', 'clean-css', 'watch']);
