var gulp = require('gulp');
var htmlmin = require('gulp-htmlmin');

function format(cb) {
  gulp
    .src('public/**/*.html')
    .pipe(
      htmlmin({
        collapseWhitespace: true,
        minifyJS: true,
        minifyCSS: true
      })
    )
    .pipe(gulp.dest('public/'));
  cb();
}

exports.fmt = format;
