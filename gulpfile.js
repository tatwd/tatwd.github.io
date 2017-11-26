var gulp     = require('gulp');
var htmlmin  = require('gulp-htmlmin');
var htmlbtfy = require('gulp-html-beautify');

gulp.task('beautify:html', () => {
    return gulp.src('public/**/*.html')
        .pipe(htmlmin({
            collapseWhitespace: true,
            minifyJS: true,//压缩页面JS
            minifyCSS: true
        }))
        .pipe(htmlbtfy({
            indentSize: 2
        }))
        .pipe(gulp.dest('public/'));
});

gulp.task('default', ['beautify:html'], () => {
    console.log('return 0');
});