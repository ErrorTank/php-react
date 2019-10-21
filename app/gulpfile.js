const gulp = require("gulp");
const spawn = require('child_process').spawn;
const nodemon = require("gulp-nodemon");



const stylusCompiler = {
    watch: (desk) => {
        require("./compile-stylus").createCompiler(desk).watch();
    },
    compile: (desk) => {
        return require("./compile-stylus").createCompiler(desk).compile();
    }
};

gulp.task("dev", () => {
    return Promise.resolve(stylusCompiler.watch("build")).then(() => {
        if (!/^win/.test(process.platform)) { // linux
            spawn("webpack-dev-server", [], {stdio: "inherit"});
            spawn("webpack", ["--watch"], {stdio: "inherit"});
            return;
        } else {
            spawn('cmd', ['/s', "/c", "webpack", "--w"], {stdio: "inherit"});
            spawn('cmd', ['/s', "/c", "webpack-dev-server"], {stdio: "inherit"});
            return;
        }
    }).then(() => {
        return require("./scripts/copy-assets");

    });

});


