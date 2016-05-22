module.exports = function(){
	return this.opts.plugins.del([
		this.opts.config.browser.dest,
		this.opts.config.browser.tmp
	])
}