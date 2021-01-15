const { series, src, dest } = require('gulp');
const htmlmin = require('gulp-htmlmin');
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const babel = require('gulp-babel');

function minifyHTML(cb) {
  src('public/**/*.html')
    .pipe(
      htmlmin({
        collapseWhitespace: true,
        minifyJS: true,
        minifyCSS: true,
      })
    )
    .pipe(dest('public/'));
  cb();
}

function minifyCSS(cb) {
  src('public/**/*.css')
    .pipe(cleanCSS({ compatibility: 'ie10' }))
    .pipe(dest('public/'));
  cb();
}

function minifyJS(cb) {
  src('public/**/*.js')
    .pipe(
      babel({
        presets: ['@babel/env'],
      })
    )
    .pipe(uglify())
    .pipe(dest('public/'));
  cb();
}

exports.default = series(minifyHTML, minifyCSS, minifyJS);
