module.exports = function(){
	var config = this.opts.config.browser
	var plugins = this.opts.plugins
	
	return this.gulp.src(config.src + '/**/*.pug')
		.pipe(plugins.changed(config.tmp))
		.pipe(this.gulp.dest(config.tmp))
		.pipe(plugins.pug())
		.pipe(this.gulp.dest(config.dest))
}