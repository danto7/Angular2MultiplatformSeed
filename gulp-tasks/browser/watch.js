module.exports = function(){
	var config = this.opts.config.browser
	var plugins = this.opts.plugins

	plugins.browserSync.init({
		server: {
			baseDir: config.dest,
			routes: {
				'/vendor': 'node_modules'
			}
		}
	})

	this.gulp.watch(config.src + '/**/*.ts', () => {
		plugins.runSequence(
			'browser:typescript',
			plugins.browserSync.reload
		)
	})
	
	this.gulp.watch(config.src + '/**/*.pug', () => {
		plugins.runSequence(
			'browser:pug',
			plugins.browserSync.reload
		)
	})

	this.gulp.watch(config.src + '/**/*.scss', () => {
		plugins.runSequence(
			'browser:sass',
			plugins.browserSync.reload
		)
	})
}

module.exports.dependencies = ['browser:build']
