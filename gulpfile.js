var gulp = require('gulp'),
	sass = require('gulp-sass'),
	cssnano = require('gulp-cssnano'),
	rename = require('gulp-rename'),
	concat = require('gulp-concat'),
	uglifyjs = require('gulp-uglifyjs'),
	autoprefixer = require('gulp-autoprefixer'),
	browserSync = require('browser-sync'),
	del = require('del');

gulp.task('clean', function(){
	del.sync('dist')
});

gulp.task('browser-sync', function(){
	browserSync({
		server:{
			baseDir: 'app'
		},
		notify: false
	})
});

gulp.task('js',function(){
	return gulp.src(['',''])

		.pipe(concat('libs.min.js'))
		.pipe(uglifyjs())
		.pipe(gulp.dest('app/js'))
});

gulp.task('css', ['sass'], function(){
	return gulp.src('app/css/libs.css')
	.pipe(cssnano())
	.pipe(rename({suffix: '.min'}))
	.pipe(gulp.dest('app/css'))
});

gulp.task('sass', function(){
	return gulp.src('app/sass/**/*.sass')
		.pipe(sass({outputStyle:'expanded'}))
		.pipe(autoprefixer({
			browsers: ['last 15 version']
		}))
		.pipe(gulp.dest('app/css'))
		.pipe(browserSync.reload({stream: true}))
});

gulp.task('watch', ['sass', 'browser-sync'], function(){
	gulp.watch('app/sass/**/*.sass', ['sass'])
	gulp.watch('app/*.html', browserSync.reload)
	gulp.watch('app/js/**/*.js', browserSync.reload)
});

gulp.task('build', ['clean'], function(){
	var buildHtml = gulp.src('app/*.html')
		.pipe(gulp.dest('dist'))

	var buildCss = gulp.src(['!app/css/libs.css',
							'app/css/**/*.css'])
		.pipe(gulp.dest('dist/css'))

	var buildJs = gulp.src('app/js/**/*.js')
		.pipe(gulp.dest('dist/js'))

	var buildFonts = gulp.src('app/fonts/**/*')
		.pipe(gulp.dest('dist/fonts'))
});

gulp.task('default', ['watch']);