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
				error:   'danger'
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
				alertContainer: '.formJS'
			},
			redirection: {
				message: 'Automatic redirection in a second',
				delay:   1100
			},
			btnSubmit:   '.btn[type="submit"]',
			callback:    function () {
			}
		}, options );

		obj.each( function () {
			var $this        = $( this );
			var action       = $this.attr( "action" );
			var method       = $this.attr( "method" );
			var btnSubmit    = $this.find( settings.btnSubmit );
			var currentAlert = $.extend( settings.alerts.unexpected, { type: 'error' } );
			var formdata;
			var data;
			var ajaxSettings;

			$this.submit( function ( e ) {
				e.preventDefault();

				try {
					if ( btnSubmit.length === 0 )
						throw 'Unable to find submit button';

					btnSubmit
						.append( $( settings.icons.loading ).addClass( 'formJS-loading' ) )
						.attr( 'disabled' );

					if ( method == "" || method == null ) {
						throw 'Undefined method of form';

					} else {
						formdata     = (window.FormData) ? new FormData( $this[ 0 ] ) : null;
						data         = (formdata !== null) ? formdata : $this.serialize();
						ajaxSettings = $.extend( settings.form.ajaxSettings, {
							url:         action,
							type:        method,
							data:        data,
							processData: false
						} );

						$.ajax( ajaxSettings )
							.done( function ( feedback ) {
								try {
									// If no feedback found, write unexpected alert
									if ( feedback.length === 0 ) {
										throw 'No data found on response'
									}

									var feedbackData = $.parseJSON( feedback );
									var notif        = "";

									$this.checkFeedbackStructure( feedbackData );

									//console.log( currentAlert );

									// Redirection si type = "success" et si une Url est spécifié
									if ( feedbackData.type === settings.keys.success && feedbackData.hasOwnProperty( 'url' ) ) {

										notif = ' - ' + settings.redirection.message;
										setTimeout( function () {
											window.location.replace( feedbackData.url );
										}, settings.redirection.delay );
									}

									// Affichage de l'alert
									currentAlert.type    = feedbackData.type;
									currentAlert.title   = feedbackData.data.title;
									currentAlert.message = feedbackData.data.message + notif;

								} catch ( error ) {
									console.error( '[FormJS] ' + error );
								}
							} )
							.fail( function ( error ) {
								console.error( error );
							} )
							.always( function () {
								//console.log( currentAlert );
								$this.writeAlert();
							} );
					}
				} catch ( error ) {
					console.error( '[FormJS] ' + error );
					$this.writeAlert();
				}
			} );

			/**
			 * Check the structure of feedback response
			 * @param inputData
			 */
			$this.checkFeedbackStructure = function ( inputData ) {
				var feedbackStructure = {
					type: '',
					url:  '',
					data: {
						title:   '',
						message: ''
					}
				};

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
			 * Create DOM alert
			 */
			$this.writeAlert = function () {
				var alert = $( '<div class="alert formjs-' + currentAlert.type + '" role="alert" />' )
					.html( '<div class="ico">\n\
								' + settings.icons[ currentAlert.type ] + '\n\
							</div>\n\
							<div class="info">\n\
								<h4>' + currentAlert.title + '</h4>\n\
								<p>' + currentAlert.message + '</p>\n\
							</div>' )
					.hide()
					.fadeIn( 300 );

				$( settings.form.alertContainer )
					.empty()
					.html( alert );

				$( 'html, body' ).animate( {
					scrollTop: $( settings.form.alertContainer ).offset().top - 55
				}, 300 );

				var btnSubmit = $( settings.btnSubmit );
				if ( btnSubmit !== undefined && btnSubmit.length ) {
					//console.log(btnSender);
					btnSubmit
						.find( '.formJS-loading' )
						.remove();
				}

				if ( currentAlert.type === settings.keys.success || currentAlert.type === settings.keys.info )
					console.log( currentAlert.title + " - " + currentAlert.message );

				else if ( currentAlert.type === settings.keys.error )
					console.error( currentAlert.title + " - " + currentAlert.message );

				else if ( currentAlert.type === settings.keys.warning )
					console.warn( currentAlert.title + " - " + currentAlert.message );

				else
					console.log( currentAlert.title + " - " + currentAlert.message );

				settings.callback();
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


	$.fn.setDisplayForm = function () {
		var disp = ($( window ).width() <= 768) ? "block" : "flex";
		$( this ).css( "display", disp );

		return this;
	};


	/*$( "form:not(.noForm)" ).submit( function ( e ) {
		var $this     = $( this );
		var action    = $this.attr( "action" );
		var method    = $this.attr( "method" );
		var callback  = $this.data( 'callback' );
		var btnSubmit = $this.find( ".btn[type=\"submit\"]" );
		var formdata;
		var data;
		var alert     = {
			type:  "danger",
			titre: "Erreur",
			msg:   "Une erreur inconnue s'est produite."
		};

		//console.log(e.currentTarget);

		if ( $this.attr( "data-preventDefault" ) !== "yes" )
			return e;
		else {
			e.preventDefault();

			btnSubmit
				.html( btnSubmit.html() + ' <span class="fa fa-circle-o-notch fa-spin"></span>' )
				.attr( "disabled" );
			//console.log(btnSubmit.html());

			//console.log($this.serialize());
			if ( method == "" || method == null ) {
				alert.type  = "error";
				alert.titre = "Erreur fatale";
				alert.msg   = "Formulaire - Méthode non spécifié";
				writeAlert( $this, alert, btnSubmit );
			}
			else {

				formdata = (window.FormData) ? new FormData( $this[ 0 ] ) : null;
				data     = (formdata !== null) ? formdata : $this.serialize();

				$.ajax( {
					url:         action,
					type:        method,
					data:        data,
					contentType: false,
					processData: false,
					success:     function ( retour ) {
						//console.log(retour);
						if ( retour == '' ) {
							writeAlert( $this, alert, btnSubmit );
							return;
						}

						var dataRetour = $.parseJSON( retour );
						var notif      = "";
						//console.log(dataRetour);

						// Le Type doit strictement être parmis "success", "warning" et "danger"
						if ( dataRetour.Type === "success"
							|| dataRetour.Type === "warning"
							|| dataRetour.Type === "danger"
							|| dataRetour.Type === "info" ) {

							// Redirection si Type = "success" et si une Url est spécifié
							if ( dataRetour.Type === "success"
								&& dataRetour.Url != null ) {

								notif = " - Redirection automatique dans une seconde";
								setTimeout( function () {
									window.location.replace( dataRetour.Url );
								}, 1100 );
							}

							// Affichage de l'alert
							alert.type  = dataRetour.Type;
							alert.titre = dataRetour.Data.Titre;
							alert.msg   = dataRetour.Data.Message + notif;
							writeAlert( $this, alert, btnSubmit, callback );
							return;

						} else {
							writeAlert( $this, alert, btnSubmit );
							return;
						}
					},
					error:       function ( data, status, error ) {
						//console.log(data.status);
						//console.log(status + " -- " + error);

						alert.type  = "error";
						alert.titre = "Erreur: " + error;
						alert.msg   = "Impossible d'envoyer les données.";
						writeAlert( $this, alert, btnSubmit );
						return;
					}
				} );
			}
		}
	} );*/
})( jQuery );

$( window ).resize( function () {
	$( "form .messageForm .alert" ).setDisplayForm();
} );
