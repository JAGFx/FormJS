/*
 * Copyright (c) 2019.  JAGFx
 * @author: SMITH Emmanuel
 * @version: 2.1.0
 *
 */

(function ( $ ) {
	$.fn.formJS = function ( options ) {
		var obj = this;

		var settings = $.extend( true, {
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
				ajaxSettings:     {
					contentType: false
				},
				alertContainer:   '.formJS',
				btnSubmit:        '.btn[type="submit"]',
				enableWriteAlert: true
			},
			redirection: {
				message: 'Automatic redirection in a second',
				delay:   1100
			},
			callback:    function ( currentAlert ) {
			}
		}, options );

		return obj.each( function () {
			var $this      = $( this );
			var action,
				method,
				btnSubmit,
				currentAlert,
				currentResponseType,
				ajaxPending,
				ajaxSettings,
				formdata,
				data,
				writeError;

			/**
			 * Sending data method
			 * @param e
			 */
			$this.sendData = function ( e ) {
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
					writeError   = false;
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

								var feedbackData = (feedback instanceof Object)
									? feedback
									: $.parseJSON( feedback );
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

								if ( $this.responseIsAFeedback() ) {
									// --------------- Make alert object with feedback
									currentAlert.type    = feedbackData.type;
									currentAlert.title   = feedbackData.data.title;
									currentAlert.message = feedbackData.data.message + notif;

								} else if ( $this.responseIsAView() ) {
									// --------------- ... Or just replace the current form by the response view

									$this.updateFormView( feedbackData.view );
								}

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
				}
			};

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

				if ( !inputData.hasOwnProperty( 'data' ) && !inputData.hasOwnProperty( 'view' ) )
					throw 'Invalid feedback structure: "data" or "view" missing';

				if ( inputData.hasOwnProperty( 'data' ) ) {
					currentResponseType = 'responseFeedback';

					if ( !inputData.data.hasOwnProperty( 'title' ) )
						throw 'Invalid feedback structure: "data.title" missing';

					if ( !inputData.data.hasOwnProperty( 'message' ) )
						throw 'Invalid feedback structure: "data.message" missing';

					if ( Object.keys( settings.keys ).indexOf( inputData.type ) === -1 )
						throw 'Invalid feedback structure: "type" wrong. Accepted values: ' + Object.keys( settings.keys ).toString();
				}

				if ( inputData.hasOwnProperty( 'view' ) )
					currentResponseType = 'responseView';
			};

			/**
			 * Log and trigger error event when error are occurred during the submit processing
			 * @param place Where the error are occurred
			 * @param message Error message
			 * @param data Additional data about this error
			 */
			$this.logError = function ( place, message, data ) {
				var mess = message.message || message;

				currentAlert.type = settings.keys.error;
				console.error( '[FormJS][' + place + '] ' + mess );

				$this.trigger( 'formjs:error', [ place, mess, data ] );
				writeError = true;
			};

			/**
			 * Create DOM alert
			 */
			$this.writeAlert = function () {
				if ( !$this.responseIsAFeedback() && !writeError )
					return;

				$this.trigger( 'formjs:write-alert', [ currentAlert ] );

				if ( settings.form.enableWriteAlert === true ) {
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
				}

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
			 * Update the HTML DOM with the content returned by the response. Only work with view response type
			 * @param viewData HTML of response
			 */
			$this.updateFormView = function ( viewData ) {
				if ( !$this.responseIsAView() )
					return;

				$this.html( viewData );
				$this.init();
			};

			/**
			 * Return true if the response of sending request is a feedback
			 * @returns {boolean}
			 */
			$this.responseIsAFeedback = function () {
				return currentResponseType === 'responseFeedback';
			};

			/**
			 * Return true if the response of sending request is a view
			 * @returns {boolean}
			 */
			$this.responseIsAView = function () {
				return currentResponseType === 'responseView';
			};

			// ---------------------------- INIT

			/**
			 * Create the container if it not found
			 */
			$this.init = function () {
				$this.initVariables();

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

			/**
			 * Init variables with current formJS object
			 */
			$this.initVariables = function () {
				action              = $this.attr( "action" );
				method              = $this.attr( "method" );
				btnSubmit           = $this.find( settings.form.btnSubmit );
				currentAlert        = $.extend( settings.alerts.unexpected, { type: 'error' } );
				ajaxPending         = false;
				currentResponseType = undefined;

				$this.initEvent();
			};

			/**
			 * Init event with current formJS object
			 */
			$this.initEvent = function () {
				/**
				 * Process to sending data from the current form object
				 */
				$this.submit( $this.sendData );

				/**
				 * Process to sending data from on other way from the formJS plugin
				 */
				$this.on( 'formjs:send-form', $this.sendData );
			};

			$this.init();

			return $this;
		} );
	};

})( jQuery );
