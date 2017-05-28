const gulp = require('gulp');
const uglify = require('gulp-uglify');
const browserify = require('browserify');
const tsify = require("tsify");
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const gulpLess = require('gulp-less');
const LessCleanCSS = require('less-plugin-clean-css');
const LessAutoPrefix = require('less-plugin-autoprefix');

const vendors = [
  'dateformat',
  'rxjs',
  'react',
  'react-dom',
  'react-redux',
  'redux',
  'redux-observable'
];

gulp.task('build:less', function () {
  return gulp
    .src('./styles/index.less')
    .pipe(gulpLess({
      plugins: [
        new LessAutoPrefix({ browsers: ["last 2 versions"] }),
        new LessCleanCSS({ advanced: true })
      ]
    }))
    .pipe(gulp.dest('./'));
});

gulp.task('build:vendor', () => {
  const brsf = browserify();

  vendors.forEach(lib => brsf.require(lib));

  brsf
    .bundle()
    .pipe(source('vendor.js'))
    // .pipe(buffer())
    // .pipe(uglify())
    .pipe(gulp.dest('./'));
});

gulp.task('build:app', () => {
  const brsf = browserify({
    entries: ['./src/index.tsx'],
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
    debug: true
  });

  brsf
    .external(vendors)
    .plugin(tsify, {
      typescript: require('typescript')
    })
    .bundle()
    .on('error', onerror)
    .pipe(source('app.js'))
    // .pipe(buffer())
    // .pipe(uglify())
    .pipe(gulp.dest('./'));
});

gulp
  .watch('./styles/**/*.less', ['build:less'])
  .on('change', onchange);

gulp
  .watch('./src/**/*.{js,jsx,ts,tsx,json}', ['build:app'])
  .on('change', onchange);

gulp.task('default', ['build:vendor', 'build:app', 'build:less']);

function onchange(event) {
  console.log('File ' + event.path + ' was ' + event.type);
}

function onerror(error) {
  console.error(
    error.toString()
  );
}