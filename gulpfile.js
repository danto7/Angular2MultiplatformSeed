var gulp = require('gulp'),
    runSequence = require('run-sequence')

var frontend = require('./tools/tasks/frontend.js')(gulp)

gulp.task('default', (done) => {

})

  gulp.task('frontend.clean', (done) => {
    runSequence(
      [
        'frontend.clean.dist',
        'frontend.clean.tmp'
      ],
      done
    )
  })

gulp.task('frontend.build', (done) => {
  console.log("\n" + 'You are in ' + require('./.env').NODE_ENV + ' mode.' + "\n")
  runSequence(
    'frontend.clean',
    [
      'frontend.build.typescript',
      'frontend.build.vendor',
      'frontend.build.sass'
    ],
    'frontend.build.jade',
    done
  )
})
