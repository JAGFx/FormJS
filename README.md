<!-- TITLE/ -->

<h1>Feedback jQuery plugin</h1>

<!-- /TITLE -->


<!-- BADGES/ -->

<span class="badge-npmversion"><a href="https://npmjs.org/package/jagfx-formjs" title="View this project on NPM"><img src="https://img.shields.io/npm/v/jagfx-formjs.svg" alt="NPM version" /></a></span>
<span class="badge-daviddm"><a href="https://david-dm.org/JAGFx/FormJS" title="View the status of this project's dependencies on DavidDM"><img src="https://img.shields.io/david/JAGFx/FormJS.svg" alt="Dependency Status" /></a></span>
<span class="badge-daviddmdev"><a href="https://david-dm.org/JAGFx/FormJS#info=devDependencies" title="View the status of this project's development dependencies on DavidDM"><img src="https://img.shields.io/david/dev/JAGFx/FormJS.svg" alt="Dev Dependency Status" /></a></span>
<span class="badge-badge"><a href="https://scrutinizer-ci.com/g/JAGFx/FormJS/build-status/master" title="Build Status"><img src="https://scrutinizer-ci.com/g/JAGFx/FormJS/badges/build.png?b=master" alt="Build Status" /></a></span>
<span class="badge-badge"><a href="https://scrutinizer-ci.com/g/JAGFx/FormJS/?branch=master" title="Scrutinizer Code Quality"><img src="https://scrutinizer-ci.com/g/JAGFx/FormJS/badges/quality-score.png?b=master" alt="Scrutinizer Code Quality" /></a></span>

<!-- /BADGES -->


<!-- DESCRIPTION/ -->

jQuery plugin to give feedback to user with ajax request

<!-- /DESCRIPTION -->

### [DEMO](http://labs.jagfx.fr/formJS/example/)

## Fonts

* [Quicksand regular](https://fonts.google.com/specimen/Quicksand?selection.family=Quicksand)

<!-- INSTALL/ -->

<h2>Install</h2>

<a href="https://npmjs.com" title="npm is a package manager for javascript"><h3>NPM</h3></a><ul>
<li>Install: <code>npm install --save jagfx-formjs</code></li>
<li>Module: <code>require('jagfx-formjs')</code></li></ul>

<!-- /INSTALL -->


## Usage

### Quick use

#### Minimal code

````html
<!DOCTYPE html>
<html lang="en" >
	<head >
		<meta charset="UTF-8" >
		<title >FormJS</title >
		
		<link rel="stylesheet" href="node_modules/@fortawesome/fontawesome-free-webfonts/css/fa-solid.css" >
		<link rel="stylesheet" href="node_modules/@fortawesome/fontawesome-free-webfonts/css/fa-brands.css" >
		<link rel="stylesheet" href="node_modules/@fortawesome/fontawesome-free-webfonts/css/fontawesome.css" >
		
		<link href="https://fonts.googleapis.com/css?family=Quicksand" rel="stylesheet" >
		
		<link rel="stylesheet" href="node_modules/jagfx-formjs/dist/css/theme-flat/formJS-flat.css" id="styleAlert" >
	</head >
	<body >
		<form id="yourForm" method="post" >
			<button class="btn" type="submit">Submit</button>
		</form>
		
		<script >
			$( '#youForm' ).formJS();
		</script>
	</body >
</html >
````

> Note: By default, the font used is "Quicksand Regular". If you want to change it, you can override or create a custom style

#### Response structure

The response MUST be in JSON and match with this structure

````json
{
	"type": 	"success",
	"url": 		"yourUrl (optionally entry)",
	"data" : 	{
		"title": 	"yourTitle",
		"message": 	"yourMessage"
	}
}
````


### Custom settings

#### Alert message

You can customise the default error message (Unexpected by example)

````javascript
$( '#yourForm' ).formJS( {
	alerts: {
		unexpected: {
			title:   'Custom unexpected error title',
			message: 'Custom unexpected error message'
		},
		failSend:   {
			title:   'Custom fail send data error title',
			message: 'Custom fail send data error message'
		}
	}
} );
````

#### Keys

The keys are suffix added after 'formjs' class into `alertContainer`. It use for style customisation.

> Note: If you change it, you MUST rebuild style with SCSS builder

````javascript
$( '#yourForm' ).formJS( {
	keys: {
		success: 'success-custom',
		info:    'info-custom',
		warning: 'warning-custom',
		error:   'error-custom'
	}
} );
````

#### Icons

By default, i use [Fontawesome regular](https://fontawesome.com/) icons pack. 

You can change it, set html icon as you want and use icons pack as you want:

* `<i></i> balise`
* `<span></span> balise`
* `<img /> balise`
* Text also

````javascript
$( '#yourForm' ).formJS( {
	icons: {
		loading: '<span class="fas fa-circle-notch fa-spin"></span>',
		success: '<i class="fas fa-check-square"></i>',
		info:    '<span class="ti-info"></span>',
		warning: '<img src="myIcon.svg" />',
		error:   'ERR'
	}
} );
````

#### Form

If you have custom header request, you can pass into this setting. The `url`, `method` and `data` can't be modified

Also, you can change de formJS container and submit button identifier.

> Note: If you change container, you MUST rebuild style with correct container.

````javascript
$( '#yourForm' ).formJS( {
	form: {
		ajaxSettings:   {
			async: 		false,
			beforeSend: function (xhr){ 
				xhr.setRequestHeader('Authorization', make_base_auth(username, password)); 
			}
		},
		alertContainer: '.customContainer',
		btnSubmit:      '.myCustomBtnID'
	}
} );
````

#### Redirection

You can redirect user after ajax request. A message will be added after error title.

You can change this message and delay before the redirection

````javascript
$( '#yourForm' ).formJS( {
	redirection: {
		message: 'Custom redirect message',
		delay:   2500
	}
} );
````

#### Callback

At the end of precess, a callback are called. You can set. The current alert is passed to function parameter

````javascript
$( '#yourForm' ).formJS( {
	callback: function ( currentAlert ) {
		// Do something with currentAlert
	}
} );
````

#### Full default settings
````javascript
var settings  = {
	alerts:      {
		unexpected: {
			title:   'Error',
			message: 'Unexpected error occurred'
		},
		failSend:   {
			title:   'Error',
			message: 'Unable to send data'
		}
	},
	keys:        {
		success: 'success',
		info:    'info',
		warning: 'warning',
		error:   'error'
	},
	icons:       {
		loading: '<span class="fas fa-circle-notch fa-spin"></span>',
		success: '<span class="fas fa-check"></span>',
		info:    '<span class="fas fa-info"></span>',
		warning: '<span class="fas fa-exclamation-triangle"></span>',
		error:   '<span class="fas fa-fire"></span>'
	},
	form:        {
		ajaxSettings:   {
			contentType: false
		},
		alertContainer: '.formJS',
		btnSubmit:      '.btn[type="submit"]'
	},
	redirection: {
		message: 'Automatic redirection in a second',
		delay:   1100
	},
	callback:    function ( currentAlert ) {
	}
};
````

### Custom style

You have SCSS files to allow you to create custom style.

In `formJSFolder/scss/`, you can find `_core*.scss` files. Use it as base structure of your custom style.
Create a folder named with theme name and add two file:

* `_variables.scss`: Contain YOUR theme variable. It use to override core variables  
* `your-theme-name.scss`: Contain all customisation for type of alert: `Success`, `Info`, `Warning` and `Error`. Use preset from on of existing template

At the end of customisation, run  `npm run scss:dist` to generate your style css file and minified too.

### NPM commands

Remove old css files
````bash
$ npm run scss:clean
````

Generate css files
````bash
$ npm run scss:build
````

Launch scss watcher to generate css file at change
````bash
$ npm run scss:watch
````

Generate css dist files
````bash
$ npm run css:dist
````

Generate js dist files
````bash
$ npm run js:dist
````

Generate css and js dist files
````bash
$ npm run gulp:default
````

<!-- LICENSE/ -->

<h2>License</h2>

Unless stated otherwise all works are:

<ul><li>Copyright &copy; <a href="http://www.jagfx.fr">SMITH Emmanuel</a></li></ul>

and licensed under:

<ul><li><a href="http://spdx.org/licenses/GPL-3.0.html">GNU General Public License v3.0 only</a></li></ul>

<!-- /LICENSE -->
