/*
 * Copyright (c) 2018.  JAGFx
 * @author: SMITH Emmanuel
 * @version: 2.0.0
 */

(function ( $ ) {
	$.fn.formJS = function ( options ) {
		var obj = this;

		var settings = $.extend( {
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
		}, options );

		obj.each( function () {
			var $this        = $( this );
			var action       = $this.attr( "action" );
			var method       = $this.attr( "method" );
			var btnSubmit    = $this.find( settings.form.btnSubmit );
			var currentAlert = $.extend( settings.alerts.unexpected, { type: 'error' } );
			var ajaxPending  = false;
			var ajaxSettings;
			var formdata;
			var data;

			$this.submit( function ( e ) {
				e.preventDefault();
				
				// --------------- Check if an ajax request is in precessing
				if ( ajaxPending === false )
					ajaxPending = true;
				else return;

				try {
					// --------------- Check if a submit button is found
					if ( btnSubmit.length === 0 )
						throw 'Unable to find submit button';

					// --------------- Check if form method is found
					if ( method == "" || method === null )
						throw 'Undefined method of form';

					// --------------- Add loader and disabled submit button
					btnSubmit
						.append( $( settings.icons.loading ).addClass( 'formJS-loading' ) )
						.attr( 'disabled' );

					btnSubmit.addClass( 'disabled' );

					// --------------- Prepare ajax setting
					formdata     = (window.FormData) ? new FormData( $this[ 0 ] ) : null;
					data         = (formdata !== null) ? formdata : $this.serialize();
					ajaxSettings = $.extend( settings.form.ajaxSettings, {
						url:         action,
						type:        method,
						data:        data,
						processData: false
					} );
					
					$this.trigger( 'formjs:submit', [ ajaxSettings, ajaxPending ] );

					// --------------- Send ajax request
					$.ajax( ajaxSettings )
						.done( function ( feedback ) {
							try {
								// --------------- If no feedback found, write unexpected alert
								if ( feedback.length === 0 )
									throw 'No data found on response';

								var feedbackData = $.parseJSON( feedback );
								var notif        = '';
								
								$this.trigger( 'formjs:ajax-success', [ feedback ] );

								// --------------- Check feedback structure
								$this.checkFeedbackStructure( feedbackData );

								// --------------- If url field is in feedback,  prepare to redirect to it
								if ( feedbackData.type === settings.keys.success && feedbackData.hasOwnProperty( 'url' ) ) {
									notif = ' - ' + settings.redirection.message;

									setTimeout( function () {
										window.location.replace( feedbackData.url );
									}, settings.redirection.delay );
								}

								// --------------- Make alert object with feedback
								currentAlert.type    = feedbackData.type;
								currentAlert.title   = feedbackData.data.title;
								currentAlert.message = feedbackData.data.message + notif;

							} catch ( error ) {
								$this.logError( 'AjaxSuccessCallback', error, feedback );
							}
						} )
						.fail( function ( error ) {
							$this.logError( 'AjaxFailCallback', error );
						} )
						.always( function () {
							// --------------- Call after all ajax request
							$this.writeAlert();
						} );

				} catch ( error ) {
					// --------------- Call if an error thrown before sending ajax request
					$this.logError( 'PreSubmit', error );
					$this.writeAlert();
				}
			} );

			/**
			 * Check the structure of feedback response
			 * @param inputData
			 */
			$this.checkFeedbackStructure = function ( inputData ) {
				/**
				 * feedbackStructure = {
						type: '',
						url:  '',
						data: {
							title:   '',
							message: ''
						}
					};
				 */

				if ( !inputData.hasOwnProperty( 'type' ) )
					throw 'Invalid feedback structure: "type" missing';

				if ( !inputData.hasOwnProperty( 'data' ) )
					throw 'Invalid feedback structure: "data" missing';

				if ( !inputData.data.hasOwnProperty( 'title' ) )
					throw 'Invalid feedback structure: "data.title" missing';

				if ( !inputData.data.hasOwnProperty( 'message' ) )
					throw 'Invalid feedback structure: "data.message" missing';

				if ( Object.keys( settings.keys ).indexOf( inputData.type ) === -1 )
					throw 'Invalid feedback structure: "type" wrong. Accepted values: ' + Object.keys( settings.keys ).toString();
			};
			
			/**
			 * Log and trigger error event when error are occurred during the submit processing
			 * @param place Where the error are occurred
			 * @param message Error message
			 * @param data Additional data about this error
			 */
			$this.logError = function ( place, message, data ) {
				var mess = message.message || message;
				
				console.error( '[FormJS][' + place + '] ' + mess );
				
				$this.trigger( 'formjs:error', [ place, mess, data ] );
			};

			/**
			 * Create DOM alert
			 */
			$this.writeAlert = function () {
				$this.trigger( 'formjs:write-alert', [ currentAlert ] );
				
				// --------------- Create alert DOM element
				var alert = $( '<div class="alert formjs-' + settings.keys[ currentAlert.type ] + '" role="alert" />' )
					.html( '<div class="ico">\n\
								' + settings.icons[ currentAlert.type ] + '\n\
							</div>\n\
							<div class="info">\n\
								<h4>' + currentAlert.title + '</h4>\n\
								<p>' + currentAlert.message + '</p>\n\
							</div>' )
					.hide()
					.fadeIn( 300 );

				// --------------- Add alert DOM element to the container
				$( settings.form.alertContainer )
					.empty()
					.html( alert );

				// --------------- Scroll top
				$( 'html, body' ).animate( {
					scrollTop: $( settings.form.alertContainer ).offset().top - 55
				}, 300 );

				// --------------- Enable formJS process and enabled submit button
				var btnSubmit = $( settings.form.btnSubmit );
				if ( btnSubmit !== undefined && btnSubmit.length ) {
					btnSubmit
						.find( '.formJS-loading' )
						.remove();

					btnSubmit.removeClass( 'disabled' );

					ajaxPending = false;
				}

				// --------------- Print alert into developper console
				if ( currentAlert.type === 'success' || currentAlert.type === 'info' )
					console.log( currentAlert.title + " - " + currentAlert.message );

				else if ( currentAlert.type === 'error' )
					console.error( currentAlert.title + " - " + currentAlert.message );

				else if ( currentAlert.type === 'warning' )
					console.warn( currentAlert.title + " - " + currentAlert.message );

				else
					console.log( currentAlert.title + " - " + currentAlert.message );

				settings.callback( currentAlert );
			};

			/**
			 * Create the container if it not found
			 */
			$this.init = function () {
				var container = $this.find( settings.form.alertContainer );

				if ( container.length === 0 ) {
					var $el        = $( '<div/>' );
					var props      = settings.form.alertContainer.split( '.' ),
						newelement = $el,
						id         = '',
						className  = '';
					$.each( props, function ( i, val ) {
						if ( val.indexOf( '#' ) >= 0 ) {
							id += val.replace( /^#/, '' );
						} else {
							className += val + ' ';
						}
					} );

					if ( id.length ) newelement.attr( 'id', id );
					if ( className.length ) newelement.attr( 'class', className.trim() );

					$this.prepend( newelement );
				}
			};

			$this.init();
		} );

		return obj;
	};

})( jQuery );
