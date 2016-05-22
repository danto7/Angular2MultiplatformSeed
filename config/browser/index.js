module.exports = {
    src: "src/browser",
    dest: "dist/browser",
    tmp: ".tmp",
    vendor: [
        "node_modules/rxjs/**/*",
        "node_modules/angular2-in-memory-web-api/**/*",
        "node_modules/@angular/**/*",
        "node_modules/es6-shim/es6-shim.min.js",
        "node_modules/zone.js/dist/zone.js",
        "node_modules/reflect-metadata/Reflect.js",
        "node_modules/systemjs/dist/system.src.js"
    ],
    tsconfig: './config/browser/tsconfig.json'
}
