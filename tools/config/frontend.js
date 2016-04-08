var path = require('path'),
    _ = require('lodash')

frontendConfig = {
  SRC: "./src/frontend",
  DEST: "./dist/frontend",
  TMP: "./.tmp",

  VENDOR_FILES: [
    "./node_modules/es6-shim/es6-shim.min.js",
    "./node_modules/systemjs/dist/system-polyfills.js",
    "./node_modules/angular2/es6/dev/src/testing/shims_for_IE.js",
    "./node_modules/angular2/bundles/angular2-polyfills.js",
    "./node_modules/systemjs/dist/system.src.js",
    "./node_modules/rxjs/bundles/Rx.js",
    "./node_modules/angular2/bundles/angular2.dev.js"
  ],
  JADE_LOCALS: {
    appTitle: "Angular2 Multiplaform Seed"
  },
  get LOCALS(){
    return _.merge(this.JADE_LOCALS, { vendorFiles:
      _.map(
        this.VENDOR_FILES,
        (v) => { return './vendor/' + path.basename(v) } )})
  },

  TS_CONFIG: "tsconfig.json"
}
module.exports = frontendConfig
