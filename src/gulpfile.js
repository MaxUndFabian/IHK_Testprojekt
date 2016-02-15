var gulp = require('gulp');
var sass = require('gulp-ruby-sass');
var nodemon = require('gulp-nodemon');
var browserSync = require('browser-sync');
var reload = browserSync.reload;

    gulp.task('sass', function() {
        return sass('client/scss/main.scss')
            .pipe(gulp.dest('client/css'))
            .pipe(reload({ stream:true }));
    });

    // watch Sass files for changes, run the Sass preprocessor with the 'sass' task and reload
    gulp.task('serve', ['sass', 'nodemon'], function() {
        browserSync.init(null, {
		    proxy: "http://localhost:3000",
            files: ["client/**/*.*"],
            browser: "google chrome",
            port: 7000,
	});

        gulp.watch('client/scss/*.scss', ['sass']);
    });
    
    gulp.task('nodemon', function(cb){
       var started = false;
       
       return nodemon({
           script: 'server.js'
       }).on('start', function(){
           if(!started){
               cb();
               started = true;
           }
       });
    });