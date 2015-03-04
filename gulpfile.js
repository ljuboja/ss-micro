var gulp = require('gulp'),
    gutil = require('gulp-util'),
    browserify = require('gulp-browserify'),
    compass = require('gulp-compass'),
    connect = require('gulp-connect'),
    gulpif = require('gulp-if'),
    uglify = require('gulp-uglify'),
    minifyHTML = require('gulp-minify-html'),
    concat = require('gulp-concat'),
    //imagemin= require('gulp-imagemin'),
    cache = require('gulp-cache'),
    //pngquant = require('imagemin-pngquant'),
    kraken = require('gulp-kraken'),
    path = require('path');


var env,
    jsSources,
    sassSources,
    htmlSources,
    outputDir,
    sassStyle;

env = 'development';

if (env==='development') {
  outputDir = 'builds/development/';
  sassStyle = 'expanded';
} else {
  outputDir = 'builds/production/';
  sassStyle = 'compressed';
}

jsSources = [
  'components/scripts/jqloader.js',
  //'components/scripts/TweenMax.min.js',
  //'components/scripts/jquery.scrollmagic.min.js',
  //'components/scripts/fontfaceobserver.js',
  //'components/scripts/fontfaceobserver.standalone.js',
  'components/scripts/script.js'

];
sassSources = ['components/sass/style.scss'];
htmlSources = [outputDir + '*.html'];

gulp.task('js', function() {
  gulp.src(jsSources)
    .pipe(concat('script.js'))
    .pipe(browserify())
    .on('error', gutil.log)
    .pipe(gulpif(env === 'production', uglify()))
    .pipe(gulp.dest(outputDir + 'js'))
    .pipe(connect.reload())
});

gulp.task('compass', function() {
  gulp.src(sassSources)
    .pipe(compass({
      sass: 'components/sass',
      css: outputDir + 'css',
      image: outputDir + 'images',
      style: sassStyle,
      fonts_dir: 'fonts',
      require: ['susy', 'breakpoint']
    })
    .on('error', gutil.log))
//    .pipe(gulp.dest( outputDir + 'css'))
    .pipe(connect.reload())
});

gulp.task('watch', function() {
  gulp.watch(jsSources, ['js']);
  gulp.watch(['components/sass/*.scss', 'components/sass/*/*.scss'], ['compass']);
  gulp.watch('builds/development/*.html', ['html']);
});

gulp.task('connect', function() {
  connect.server({
    root: outputDir,
    livereload: true
  });
});

gulp.task('html', function() {
  gulp.src('builds/development/*.html')
    .pipe(gulpif(env === 'production', minifyHTML()))
    .pipe(gulpif(env === 'production', gulp.dest(outputDir)))
    .pipe(connect.reload())
});

//Optimise images

gulp.task('kraken', function () {
    gulp.src(outputDir + 'images/*')
        .pipe(kraken({
            key: '309a7f00d16233cb46ea97ebfb0de754',
            secret: 'a5fe9709b3d85a73446bb5c5f1969a2c2bdd6b8a',
            lossy: true
        }));
});

// gulp.task('imgmin', function () {
//     return gulp.src(outputDir + 'images/*')
//         .pipe(imagemin({
//             progressive: true,
//             optimizationLevel: 6,
//             interlaced: true,
//             svgoPlugins: [{removeViewBox: false}],
//             use: [pngquant()]
//         }))
//         .pipe(gulp.dest(outputDir + 'imgmin/'));
// });


// Copy images to production
gulp.task('move', function() {
  gulp.src('builds/development/images/**/*.*')
  .pipe(gulpif(env === 'production', gulp.dest(outputDir+'images')))
});
// Copy fonts to production
// gulp.task('move', function() {
//   gulp.src('builds/development/fonts/**/*.*')
//   .pipe(gulpif(env === 'production', gulp.dest(outputDir+'fonts')))
// });
gulp.task('default', ['watch', 'html', 'js', 'compass', 'move', 'connect']);
