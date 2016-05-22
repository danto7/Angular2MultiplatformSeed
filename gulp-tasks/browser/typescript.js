module.exports = function(){
	var config = this.opts.config.browser
	var plugins = this.opts.plugins

	var tsProject = plugins.typescript.createProject(config.tsconfig);

	var src = this.gulp.src(config.src + '/**/*.ts')
		.pipe(plugins.changed(config.tmp))
		.pipe(this.gulp.dest(config.tmp))

	var typings = this.gulp.src('./typings/browser.d.ts')

	return plugins.mergeStream(src, typings)
		.pipe(plugins.sourcemaps.init())
		.pipe(plugins.typescript(tsProject))
		.js.pipe(plugins.sourcemaps.write())
		.pipe(this.gulp.dest(config.dest))
}
