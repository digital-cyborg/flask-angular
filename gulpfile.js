// Declare all dependencies for publish process
var bump = require('gulp-bump'),
    del = require('del'),
    exec = require('child_process').exec,
    gulp = require('gulp'),
    merge = require('merge2'),
    typescript = require('gulp-typescript'),
    fs = require('fs');

// Delete All Files from the /dist Folder
gulp.task('clean', function() {
    del(['dist/*']);
});


// Bump the Version in package.json
gulp.task('bump', ['clean'], function() {
    gulp.src('./package.json')
        .pipe(bump({
            type: 'patch'
        }))
        .pipe(gulp.dest('./'));
});

// Compile and Bundle the Source Files in the /dist Folder
gulp.task('bundle', ['bump'], function() {
    var tsResult = gulp.src('src/*.ts')
        .pipe(typescript({
            module: "commonjs",
            target: "es5",
            noImplicitAny: true,
            experimentalDecorators: true,
            outDir: "dist/",
            rootDir: "src/",
            sourceMap: true,
            declaration: true,
            moduleResolution: "node",
            removeComments: false,
            lib: [
                "es2015",
                "dom"
            ],
            types: ["jasmine"]
        }));

    return merge([
        tsResult.dts.pipe(gulp.dest('dist/')),
        tsResult.js.pipe(gulp.dest('dist/'))
    ]);
});

// Place a Minimized package.json in the /dist Folder
gulp.task('package', ['bundle'], () => {
    const pkgjson = JSON.parse(fs.readFileSync('./package.json', 'utf8'));
    // remove the scripts section
    delete pkgjson.scripts;
    // remove the devDependencies section
    delete pkgjson.devDependencies;
    const filepath = './dist/package.json';
    fs.writeFileSync(filepath, JSON.stringify(pkgjson, null, 2), 'utf-8');
});

// Add All New Files to Git Repository
gulp.task('git-add', ['package'], function(cb) {
    exec('git add -A', function(err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
        cb(err);
    });
});

// Commit All Changes to Git Repository
gulp.task('git-commit', ['git-add'], function(cb) {

    var package = require('./package.json');

    exec('git commit -m "Version ' + package.version + ' release."', function(err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
        cb(err);
    });
});

// Push Changes to the Remote Git Repository
gulp.task('git-push', ['git-commit'], function(cb) {

    exec('git push', function(err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
        cb(err);
    });
});

// Publish the New Version to NPM
gulp.task('publish', ['git-push'], function(cb) {

    exec('npm publish ./dist', function(err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
        cb(err);
    });
});