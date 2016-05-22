var plugins = Object.assign(require('gulp-load-plugins')(), {
	del: require('del'),
	runSequence: require('run-sequence'),
	browserSync: require('browser-sync').create(),
	mergeStream: require('merge-stream')
})

require('gulp-task-loader')({
	env: 'development',
	config: require('./config'),
	plugins: plugins
})
