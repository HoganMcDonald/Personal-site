// brew install graphviz
// npm install gulp gulp-autoprefixer gulp-clean-css gulp-rename gulp-sass gulp-uglify gulp-babel gulp-angular-architecture-graph babel-preset-es2015 gulp-concat --save-dev

//required
const gulp = require('gulp'),
  uglify = require('gulp-uglify'),
  rename = require('gulp-rename'),
  babel = require('gulp-babel'),
  babelCore = require('')
  sass = require('gulp-sass'),
  autoprefixer = require('gulp-autoprefixer'),
  cleanCSS = require('gulp-clean-css'),
  concat = require('gulp-concat'),
  ngGraph = require('gulp-angular-architecture-graph');
//end required

//tasks
gulp.task('scripts', () => {
  console.log('scripts ran');
  gulp.src(['public/scripts/classes/*.js',
    'public/scripts/app.js', 'public/scripts/controllers/*.js',
    'public/scripts/services/*.js', 'public/scripts/client.js'])
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(concat('all.js'))
    .pipe(uglify())
    .pipe(gulp.dest('public/app'));
});

gulp.task('styles', () => {
  console.log('styles ran');
  gulp.src('public/styles/sass/main.sass')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(cleanCSS({
      compatibility: '*'
    }))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('public/app'));
});

gulp.task('angular-map', () => {
  gulp.src('public/scripts/dev/*.js')
    .pipe(ngGraph({
      dest: 'architecture',
      hideAngularServices: false
    }));
});
//end tasks

//watch
gulp.task('watch:styles', () => {
  gulp.watch('public/styles/sass/*.sass', ['styles']);
});

gulp.task('watch:scripts', () => {
  gulp.watch('public/scripts/*.js', ['scripts']);
});

//default task
gulp.task('default', ['watch:scripts', 'watch:styles']);
