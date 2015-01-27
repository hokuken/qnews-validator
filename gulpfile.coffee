gulp     = require 'gulp'
uglify   = require 'gulp-uglify'
concat   = require 'gulp-concat'
plumber  = require 'gulp-plumber'
pleeease = require 'gulp-pleeease'
watch    = require 'gulp-watch'
del      = require 'del'
config   = require './config'

gulp.task 'clean', (cb) ->
  del [
    config.dest
  ], cb

gulp.task 'copy', ->
  gulp.src config.copy.src
      .pipe gulp.dest(config.copy.dest)

gulp.task 'uglify', ->
  gulp.src config.uglify.src
      .pipe concat(config.uglify.out)
      .pipe uglify()
      .pipe gulp.dest config.uglify.dest

gulp.task 'watch', ->
  watch config.watch.src, ->
    gulp.start ['uglify', 'copy']

gulp.task 'default', ['clean'], ->
  gulp.start ['uglify', 'copy', 'watch']
