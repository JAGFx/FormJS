/*
 * Copyright (c) 2019.  JAGFx
 * @author: SMITH Emmanuel
 * @version: 2.1.0
 *
 */

'use strict';

var gulp     = require( 'gulp' );
var sass     = require( 'gulp-sass' );
var clean    = require( 'gulp-clean' );
var cleanCSS = require( 'gulp-clean-css' );
var rename   = require( 'gulp-rename' );
var minify   = require( 'gulp-minify' );

var scssPath = './scss/**/';
var distCSS  = './dist/css/';

gulp.task( 'scss:clean', function () {
	return gulp.src( distCSS, { read: false, allowEmpty: true } )
		.pipe( clean() );
} );

gulp.task( 'scss:build', function () {
	return gulp.src( scssPath + '*.scss' )
		.pipe( sass() )
		.pipe( gulp.dest( distCSS ) );
} );

gulp.task( 'scss:watch', function () {
	gulp.watch( scssPath + '*.scss', gulp.series( [ 'scss:clean', 'scss:build' ] ) );
} );

gulp.task( 'css:dist', gulp.series( [ 'scss:build' ], function () {
	return gulp.src( [ distCSS + '**/*.css', '!' + distCSS + '**/*.min.css' ] )
		.pipe( cleanCSS( { compatibility: 'ie8' } ) )
		.pipe( rename( {
			suffix: '.min'
		} ) )
		.pipe( gulp.dest( distCSS ) );
} ) );

gulp.task( 'js:dist', function () {
	return gulp.src( 'dist/*.js' )
		.pipe( minify( {
			ext:         {
				src: '.js',
				min: '.min.js'
			},
			ignoreFiles: [ '*.min.js' ]
		} ) )
		.pipe( gulp.dest( 'dist' ) )
} );

gulp.task( 'default', gulp.series( [ 'css:dist', 'js:dist' ] ) );
