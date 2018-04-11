var gulp     = require('gulp');
var htmlmin  = require('gulp-htmlmin');
var htmlBeautify = require('gulp-html-beautify');

gulp.task('format:html', () => {
    return gulp.src('public/**/*.html')
        .pipe(htmlmin({
            collapseWhitespace: true, // 压缩 html
            minifyJS: true,           // 压缩页面 Js
            minifyCSS: true           // 压缩页面 css
        }))
        // .pipe(htmlBeautify({
        //     indentSize: 2
        // }))
        .pipe(gulp.dest('public/'));
});

gulp.task('default', ['format:html'], () => {
    console.log('return 0');
});