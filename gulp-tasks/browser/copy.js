module.exports = function(){
	var config = this.opts.config.browser

	this.gulp.src(config.src + '/assets/**/*')
		.pipe(this.gulp.dest(config.dest + '/assets'))
}
