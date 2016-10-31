/**
 * Created by PhpStorm.
 * @author: SMITH Emmanuel
 */


/**
 *
 * @param $form
 * @param alertData
 * @param btnSender
 * @param callback
 */
function writeAlert( $form, alertData, btnSender, callback ) {
	var containerAlert = $form
		.find( ".messageForm" )
		.empty()
		.html( "<div class=\"alert alert-cust-" + alertData.type + "\" role=\"alert\"></div>" );

	var domAlert = containerAlert.find( "div.alert-cust-" + alertData.type );

	//console.log(containerAlert.position());
	if ( domAlert.length ) {
		domAlert
			.html( "<div class=\"ico\">\n\
						<span class=\"" + toGlyph( alertData.type ) + "\"></span>\n\
					</div>\n\
					<div class=\"info\">\n\
						<h4>" + alertData.titre + "</h4>\n\
						<p>" + alertData.msg + "</p>\n\
					</div>" )
			.setDisplayForm()
			.hide()
			.fadeIn( 300 );

		$( 'html, body' ).animate( {
			scrollTop: containerAlert.offset().top - 55
		}, 300 );
	}

	else if ( alertData.type === "danger" || alertData.type === "error" )
		console.error( alertData.titre + " - " + alertData.msg );

	else if ( alertData.type === "warning" )
		console.warn( alertData.titre + " - " + alertData.msg );

	else
		console.log( alertData.titre + " - " + alertData.msg );

	if ( btnSender !== undefined && btnSender.length ) {
		//console.log(btnSender);
		btnSender
			.find( "span" )
			.remove();
	}

	if ( callback !== undefined ) {
		console.log( callback );
		window[ callback ]()
	}
}

/**.
 *
 * @param type
 * @returns {*}
 */
function toGlyph( type ) {
	if ( type === "success" )
		return "glyphicon glyphicon-ok";

	else if ( type === "info" )
		return "fa fa-info";

	else if ( type === "warning" )
		return "glyphicon glyphicon-warning-sign";

	else if ( type === "danger" )
		return "glyphicon glyphicon-remove";

	else if ( type === "error" )
		return "glyphicon glyphicon-fire";
}


(function ( $ ) {
	$.fn.setDisplayForm = function () {
		var disp = ($( window ).width() <= 768) ? "block" : "flex";
		$( this ).css( "display", disp );

		return this;
	};


	$( "form:not(.noForm)" ).submit( function ( e ) {
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
	} );
})( jQuery );

$( window ).resize( function () {
	$( "form .messageForm .alert" ).setDisplayForm();
} );
