module.exports = function(done){
	return this.opts.plugins.runSequence(
		'browser:clean',
		[
			'browser:typescript',
			'browser:pug',
			'browser:copy',
			'browser:sass'
		],
		done
	)
}