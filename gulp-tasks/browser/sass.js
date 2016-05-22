module.exports = function(){
	var config = this.opts.config.browser
	var plugins = this.opts.plugins
	
	return this.gulp.src(config.src + '/**/*.scss')
		.pipe(plugins.changed(config.tmp))
		.pipe(this.gulp.dest(config.tmp))
		.pipe(plugins.sourcemaps.init())
		.pipe(plugins.sass().on('error', plugins.sass.logError))
		.pipe(plugins.sourcemaps.write())
		.pipe(this.gulp.dest(config.dest))
		.pipe(plugins.browserSync.stream())
}