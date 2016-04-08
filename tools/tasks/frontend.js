var config = require('../config/frontend')
const ENV = require('../../.env').NODE_ENV

var typescript = require('gulp-typescript'),
    inject = require('gulp-inject'),
    del = require('del'),
    flatten = require('gulp-flatten'),
    sourcemaps = require('gulp-sourcemaps'),
    jade = require('gulp-jade'),
    util = require('gulp-util'),
    changed = require('gulp-changed'),
    print = require('gulp-print'),
    browserSync = require('browser-sync').create(),
    sass = require('gulp-sass'),
    cleanCSS = require('gulp-clean-css'),
    minify = require('gulp-minify'),
    htmlmin = require('gulp-htmlmin')

var tsProject = typescript.createProject(config.TS_CONFIG, {
  typescript: require('typescript')
})

var LOCALS = config.LOCALS

module.exports = (gulp) => {

  // ###### BUILD ######
  gulp.task('frontend.clean.dist', (done) => {
    del.sync(config.DEST + '/**')
    done()
  })

  gulp.task('frontend.clean.tmp', (done) => {
    del.sync(config.TMP + '/**')
    done()
  })

  gulp.task('frontend.build.typescript', (done) => {
    var result = gulp.src(config.SRC + "/**/*.ts")
      .pipe(ENV === 'development' ? changed(config.TMP) : util.noop())
      .pipe(ENV === 'development' ? gulp.dest(config.TMP) : util.noop()) // copy current project version to tmp to register changed files with gulp-changed
      .pipe(sourcemaps.init())
      .pipe(typescript(tsProject))

    return result.js
      .pipe(ENV === 'development' ? sourcemaps.write() : util.noop())
      .pipe(ENV === 'production' ? minify({
        noSource: true,
        ext: {
          src: '.js',
          min: '.js'
        }
      }) : util.noop())
      .pipe(gulp.dest(config.DEST))
      .pipe(print((file)=>{return "Typescript built: "+file}))
  })

  gulp.task('frontend.build.jade', (done) => {
    return gulp.src(config.SRC + '/**/*.jade')
      .pipe(changed(config.TMP))
      .pipe(sourcemaps.init())
      .pipe(ENV === 'development' ? gulp.dest(config.TMP) : util.noop())  // copy current project version to tmp to register changed files with gulp-changed
      .pipe(jade({
        locals: LOCALS,
        pretty: ENV === 'development' ? true : false
      }))
      .pipe(ENV === 'development' ? sourcemaps.write() : util.noop())
      .pipe(ENV === 'production' ? htmlmin({
        minifyJS : true
      }) : util.noop())
      .pipe(gulp.dest(config.DEST))
      .pipe(print((file)=>{return 'Jade rendered: '+file}))
  })

  gulp.task('frontend.build.sass', (done) => {
    return gulp.src(config.SRC + '/**/*.{sass,scss}')
      .pipe(changed(config.TMP))
      .pipe(sourcemaps.init())
      .pipe(ENV === 'development' ? gulp.dest(config.TMP) : util.noop())
      .pipe(sass().on('error', sass.logError))
      .pipe(ENV === 'development' ? sourcemaps.write() : util.noop())
      .pipe(ENV === 'production' ? cleanCSS() : util.noop())
      .pipe(gulp.dest(config.DEST))
      .pipe(print((file)=>{return 'Sass compiled: '+file}))
      .pipe(browserSync.stream())
  })

  gulp.task('frontend.build.vendor', (done) => {
    return gulp.src(config.VENDOR_FILES)
      .pipe(flatten())
      .pipe(ENV === 'production' ? minify({
        noSource: true,
        ext: {
          src: '.js',
          min: '.js'
        }
      }) : util.noop())
      .pipe(gulp.dest(config.DEST + '/vendor'))
  })

  // ###### WATCH ######
  gulp.task('frontend.watch', ['frontend.build:dev'], (done) => {
    browserSync.init({
        server: {
            baseDir: config.DEST
        }
    })

    var tsWatcher = gulp.watch(config.SRC + '/**/*.ts', ['frontend.build.typescript'])
    tsWatcher.on('change', browserSync.reload)

    var jadeWatcher = gulp.watch(config.SRC + '/**/*.jade', ['frontend.build.jade'])
    jadeWatcher.on('change', browserSync.reload)

    var sassWatcher = gulp.watch(config.SRC + '/**/*.{sass,scss}', ['frontend.build.sass'])
  })
}
