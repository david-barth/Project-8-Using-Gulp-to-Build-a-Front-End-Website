//Treehouse Full Stack Project 8: Using Gulp to Build a Front End Website. 


//A. Gulp Dependencies. 

const gulp = require('gulp');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const sass = require('gulp-sass');
const sourceMaps = require('gulp-sourcemaps');
const rename = require('gulp-rename');
const imageMin = require('gulp-imagemin');
const imageminMozjpeg = require('imagemin-mozjpeg'); 
const csso = require('gulp-csso');
const connect = require('gulp-connect');
const del = require('del'); 



//B. JS Gulp script Task

gulp.task('scripts', function() {
    return gulp.src('js/**/*.js')
    .pipe(sourceMaps.init())
    .pipe(concat('app.js'))
    .pipe(uglify())
    .pipe(rename('app.min.js'))
    .pipe(sourceMaps.write('./'))
    .pipe(gulp.dest('dist/scripts'));
})

// Task: Concatenates, minifies js files and directs the resulting app.min.js file to the scripts directory in dist.  A corresponding source map is generated in dist/scripts. 


//C. CSS Gulp styles Task


gulp.task('styles', function() {
    return gulp.src('./sass/**/*.scss') 
    .pipe(concat('global.scss'))  
    .pipe(sourceMaps.init()) 
    .pipe(sass()) 
    .pipe(csso()) 
    .pipe(rename('all.min.css')) 
    .pipe(sourceMaps.write('./')) 
    .pipe(gulp.dest('dist/styles')); 
})

// Task: Concatenates, minifies Sass files and directs a all.min.css file to the styles directory in dist.  A corresponding source map is generated in dist/styles.


gulp.task('styles2', function() {
    return gulp.src('sass/global.scss') 
    .pipe(sourceMaps.init()) 
    .pipe(sass()) 
    .pipe(csso()) 
    .pipe(rename('all.min.css'))
    .pipe(sourceMaps.write('./')) 
    .pipe(gulp.dest('dist/styles')); 
})


// styles2 is simply a gulp task that omits the sass/css concatenation and targets the global.scss file, which seems to import all the source sass files anyway.
// I am not sure precisely if the effect is the same, but both tasks generated a site that functions according to the expectations. 



//D. Image Gulp Tasks 

gulp.task('images', function () {
    return gulp.src('images/*')
    .pipe(imageMin([
        imageminMozjpeg({quality: 50}),
        imageMin.optipng({optimizationLevel: 7})
    ]))
    .pipe(gulp.dest('dist/content'))
})

//Task: Optimizes/minifies jpg images and png images according to appropriate plugins.  Optimized images are direct to the dist/content directory. 



//E. HTML Redirect

gulp.task('htmlRedirect', function () {
    return gulp.src('./index.html')
    .pipe(gulp.dest('dist'));
})

//Task: Copies the index.html file to the dist directory so that the web site may be accessed via said index. 



//F. Pipeline Setup: Clean and Build Tasks 

gulp.task('clean', function () {
    return del('dist/*')
})

//Task: Clears the dist directory of all files and folders. 

gulp.task('build', gulp.series('clean', 'scripts', 'styles', 'images', 'htmlRedirect'));

//Task: Coordinates all previous tasks as dependencies of a single task.  Allows all previous tasks to be run in series in order to build the complete dist directory.


//G.  Gulp Connect Task and Default Gulp Task


gulp.task('connect', function (done) {
     connect.server({
        root: 'dist', 
        port: 3000,
        livereload: true
    });
    done();
});

//Task: Creates an html server at port 3000 and based in the dist directory in order to allow the app to be run on the server. 

gulp.task('default', gulp.series('build', 'connect'))

//Task: Coordinates build and connect tasks as dependencies of the default task.  Allows all tasks to be run with the gulp command. 

