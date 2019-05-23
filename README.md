<!-- TITLE/ -->

<h1>FormJS</h1>

<!-- /TITLE -->


<!-- BADGES/ -->

<span class="badge-npmversion"><a href="https://npmjs.org/package/jagfx-formjs" title="View this project on NPM"><img src="https://img.shields.io/npm/v/jagfx-formjs.svg" alt="NPM version" /></a></span>
<span class="badge-npmdownload"><a href="https://npmjs.org/package/jagfx-formjs" title="View download from NPM"><img src="https://img.shields.io/npm/dt/jagfx-formjs.svg" alt="NPM download" /></a></span>
<span class="badge-daviddm"><a href="https://david-dm.org/JAGFx/FormJS" title="View the status of this project's dependencies on DavidDM"><img src="https://img.shields.io/david/JAGFx/FormJS.svg" alt="Dependency Status" /></a></span>
<span class="badge-daviddmdev"><a href="https://david-dm.org/JAGFx/FormJS#info=devDependencies" title="View the status of this project's development dependencies on DavidDM"><img src="https://img.shields.io/david/dev/JAGFx/FormJS.svg" alt="Dev Dependency Status" /></a></span>
<span class="badge-badge"><a href="https://scrutinizer-ci.com/g/JAGFx/FormJS/build-status/master" title="Build Status"><img src="https://scrutinizer-ci.com/g/JAGFx/FormJS/badges/build.png?b=master" alt="Build Status" /></a></span>
<span class="badge-badge"><a href="https://scrutinizer-ci.com/g/JAGFx/FormJS/?branch=master" title="Scrutinizer Code Quality"><img src="https://scrutinizer-ci.com/g/JAGFx/FormJS/badges/quality-score.png?b=master" alt="Scrutinizer Code Quality" /></a></span>

<!-- /BADGES -->


<!-- DESCRIPTION/ -->

jQuery plugin to send a html form over ajax request with feedback system

<!-- /DESCRIPTION -->

### [DEMO](http://labs.jagfx.fr/formJS/example/)

<!-- INSTALL/ -->

<h2>Install</h2>

<a href="https://npmjs.com" title="npm is a package manager for javascript"><h3>NPM</h3></a><ul>
<li>Install: <code>npm install --save jagfx-formjs</code></li>
<!-- <li>Module: <code>require('jagfx-formjs')</code></li></ul> -->

<!-- /INSTALL -->


## Usage

### Quick use

#### Minimal code

````html
<!DOCTYPE html>
<html lang="en" >
	<head >
		<meta charset="UTF-8" />
		<title >FormJS</title >
		
		<link rel="stylesheet" href="node_modules/jagfx-formjs/dist/css/theme-flat/formJS-flat.css" />
	</head >
	<body >
		<form id="yourForm" method="post" >
			<button class="btn" type="submit">Submit</button>
		</form>
		
		<script src="node_modules/jquery/dist/jquery.min.js" ></script >
		<script src="node_modules/jagfx-formjs/dist/formJS.min.js" ></script >
		<script >
			$( '#yourForm' ).formJS();
		</script>
	</body >
</html >
````

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

#### Themes

You have 3 themes available for the alert:

* Bootstrap 3/4 ( `theme-bs.css` )
* Custom ( `theme-cust.css` )
* Flat ( `theme-flat.css` )

You can choose it by including corresponding CSS

### Custom settings

#### Alert message

You can customise the default error message (Unexpected for example)

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

The keys are suffix added after 'formjs' class into `alertContainer`. Its use for style customisation.

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

You can change the icon, set html icon as you want and use icons pack as you want:

* `<i></i> balise`
* `<span></span> balise`
* `<img /> balise`
* Text also (You need to embrace the text with html balise)

````javascript
$( '#yourForm' ).formJS( {
	icons: {
		loading: '<span class="fas fa-circle-notch fa-spin"></span>',
		success: '<i class="fas fa-check-square"></i>',
		info:    '<span class="ti-info"></span>',
		warning: '<img src="myIcon.svg" />',
		error:   '<span>ERR</span>'
	}
} );
````

#### Form

If you have a custom header request, you can pass into this setting. The `url`, `method` and `data` cannot be modified

Also, you can change the formJS container and submit button identifier.

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

You can redirect the user after an Ajax request. A message will be added after error title.

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

At the end of precess, a callback is called. You can set. The current alert is passed to function parameter.

````javascript
$( '#yourForm' ).formJS( {
	callback: function ( currentAlert ) {
		// Do something with currentAlert
	}
} );
````

#### Events

You have some event that you can handle:

| Event name | When ? |
| --- | --- |
| formjs:submit | At the start of submitting the form and before sending Ajax request |
| formjs:ajax-success | On the success ajax success callback, after the parsing returned data |
| formjs:error | When an error occurred during the submit process |
| formjs:write-alert | When an alert is rendered on the DOM |

For the `formjs:error`, you can know the origin of the error:

* `AjaxSuccessCallback`: On error during the ajax success callback
* `AjaxFailCallback`: On error during the ajax fail callback
* `PreSubmit`: An error during the submitting process

````javascript
var $form = $( '#yourForm' ).formJS();
$form.on( 'formjs:write-alert', function ( e, currentAlert ) {
	// Do something with the current alert ...
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
		loading: '<span>&#8987;</span>',
		success: '<span>&#10003;</span>',
		info:    '<span>&#128712;</span>',
		warning: '<span>&#65111;</span>',
		error:   '<span>&#10799;</span>'
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

You have SCSS files to allow you to create custom styles.

In `formJSFolder/scss/`, you can find `_core*.scss` files. Use it as the base structure of your custom style.

Create a folder named with theme name and add to file:

* `_variables.scss`: Contain YOUR theme variable. It uses to override core variables  
* `your-theme-name.scss`: Contain all customisation for type of alert: `Success`, `Info`, `Warning` and `Error`. Use preset from one of existing templates

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
