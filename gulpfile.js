'use strict';

const path = require('path');
const gulp = require('gulp');
var ghPages = require('gulp-gh-pages');

gulp.task('deploy', function () {
  return gulp.src('./build/bundled/**/*')
    .pipe(ghPages());
});