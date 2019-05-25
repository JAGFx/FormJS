<?php
    /**
     * Copyright (c) 2018.  JAGFx
     *
     * @author : SMITH Emmanuel
     * @version: 2.0.0
     */
    
    if ( isset( $_POST[ 'typeFeedback' ] ) ) {
        // Post traitment
        sleep( 2 );
        
        switch ( $_POST[ 'typeFeedback' ] ) {
            case 'success':
                echo json_encode(
                    [
                        'type' => 'success',
                        /*'url'  => '',*/
                        'data' => [
                            'title'   => 'Success',
                            'message' => 'You are powerful with formJS :D'
                        ]
                    ]
                );
                break;
            
            case 'info':
                echo json_encode(
                    [
                        'type' => 'info',
                        /*'url'  => '',*/
                        'data' => [
                            'title'   => 'Info',
                            'message' => 'I love FormJS <3 !'
                        ]
                    ]
                );
                break;
            
            case 'warning':
                echo json_encode(
                    [
                        'type' => 'warning',
                        /*'url'  => '',*/
                        'data' => [
                            'title'   => 'Warning',
                            'message' => 'FormJS may be mystics'
                        ]
                    ]
                );
                break;
            
            case 'error':
                echo json_encode(
                    [
                        'type' => 'error',
                        /*'url'  => '',*/
                        'data' => [
                            'title'   => 'Error',
                            'message' => 'Oh nooo !! FormJS has invaded my heart ... ><'
                        ]
                    ]
                );
                break;
        }
        
    } else { ?>
		<!-- VIEW START -->
		<!DOCTYPE html>
		<html lang="en">
			<head>
				<meta charset="UTF-8">
				<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
				
				<title>jQuery feedback plugin - Example</title>
				
				<link rel="stylesheet" href="../node_modules/bootstrap/dist/css/bootstrap.min.css">
				<link rel="stylesheet" href="../node_modules/@fortawesome/fontawesome-free-webfonts/css/fa-solid.css">
				<link rel="stylesheet" href="../node_modules/@fortawesome/fontawesome-free-webfonts/css/fa-brands.css">
				<link rel="stylesheet" href="../node_modules/@fortawesome/fontawesome-free-webfonts/css/fontawesome.css">
				
				<!-- To import -->
				<link rel="stylesheet" href="../dist/css/theme-flat/formJS-flat.css" id="styleAlert">
				<!-- ./ To import -->
				
				<style>
					body { background: #f7f7f7; }
					
					
					.author {
						font-family: 'Quicksand', sans-serif;
					}
					
					
					.author > .btn {
						border-radius: 0;
						box-shadow:    0 2px 2px #d8d8d8;
					}
					
					
					.author .btn-web {
						background: #2C97DE;
						color:      #fff;
					}
					
					
					.author .btn-web > i {
						background: #2c7ec5;
						color:      #fff;
					}
					
					
					.author .btn-web:hover, .author .btn-web:active, .author .btn-web:focus {
						background: #2c7ec5;
						color:      #fff;
					}
					
					
					.author .btn-npm {
						background: #cb3837;
						color:      #fff;
					}
					
					
					.author .btn-npm > i {
						background: #ba3837;
						color:      #fff;
					}
					
					
					.author .btn-npm:hover, .author .btn-npm:active, .author .btn-npm:focus {
						background: #ba3837;
						color:      #fff;
					}
					
					
					.author .btn-git {
						background: #24292e;
						color:      #fff;
					}
					
					
					.author .btn-git > i {
						background: #666d72;
						color:      #fff;
					}
					
					
					.author .btn-git:hover, .author .btn-git:active, .author .btn-git:focus {
						background: #666d72;
						color:      #fff;
					}
				</style>
			</head>
			<body class="container">
				<div class="row">
					<div class="col-12">
						<div class="card mt-5">
							<div class="card-header d-flex justify-content-between align-items-center">
								FormJS example
								<div class="btn-group">
									<button class="btn btn-secondary btn-sm" type="button">
										Style: <span id="currentStyle">Flat</span>
									</button>
									<button type="button" class="btn btn-sm btn-secondary dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
										<span class="sr-only">Toggle Dropdown</span>
									</button>
									<div class="dropdown-menu  dropdown-menu-right">
										<a class="dropdown-item style" href="#" data-path="../dist/css/theme-bs/formJS-bs.css">Bootstrap
											3/4</a>
										<a class="dropdown-item style" href="#" data-path="../dist/css/theme-cust/formJS-cust.css">Custom</a>
										<a class="dropdown-item style" href="#" data-path="../dist/css/theme-flat/formJS-flat.css">Flat</a>
									</div>
								</div>
							</div>
							<div class="card-body">
								<div class="card-text">
									<form action="" id="formJS" method="post" class="col-12">
										<div class="form-group">
											<label for="typeFeedback">Type of feedback</label>
											<div class="custom-control custom-radio">
												<input type="radio" class="custom-control-input" name="typeFeedback" id="Success" value="success" checked>
												<label class="custom-control-label" for="Success">Success</label>
											</div>
											<div class="custom-control custom-radio">
												<input type="radio" class="custom-control-input" name="typeFeedback" id="Info" value="info">
												<label class="custom-control-label" for="Info">Info</label>
											</div>
											<div class="custom-control custom-radio">
												<input type="radio" class="custom-control-input" name="typeFeedback" id="Warning" value="warning">
												<label class="custom-control-label" for="Warning">Warning</label>
											</div>
											<div class="custom-control custom-radio">
												<input type="radio" class="custom-control-input" name="typeFeedback" id="Error" value="error">
												<label class="custom-control-label" for="Error">Error</label>
											</div>
										</div>
										
										<button type="submit" class="btn btn-primary">Try</button>
									</form>
								</div>
							</div>
						</div>
					</div>
					<div class="col-12">
						<div class="py-3 text-center author">
							<h2>SMITH Emmanuel</h2>
							<a class="btn btn-sm p-0 pr-2 btn-web" href="https://www.jagfx.fr" target="_blank" title="Personal website">
								<i class="fas fa-globe p-2 mr-1"></i>
								www.jagfx.fr
							</a>
							<a class="btn btn-sm p-0 pr-2 btn-npm" href="https://www.npmjs.com/package/jagfx-formjs" target="_blank" title="NPM repository page">
								<i class="fab fa-npm p-2 mr-1"></i>
								jagfx-formjs
							</a>
							<a class="btn btn-sm p-0 pr-2 btn-git" href="https://github.com/JAGFx" target="_blank" title="Github repository">
								<i class="fab fa-github p-2 mr-1"></i>
								JAGFx
							</a>
						</div>
					</div>
				</div>
				
				<script src="../node_modules/jquery/dist/jquery.js"></script>
				<script src="../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js"></script>
				<script src="../dist/formJS.js"></script>
				
				<script>
					var $form = $( '#formJS' ).formJS(
						{
							icons: {
								loading: '<span class="fas fa-circle-notch fa-spin"></span>',
								success: '<span class="fas fa-check"></span>',
								info:    '<span class="fas fa-info"></span>',
								warning: '<span class="fas fa-exclamation-triangle"></span>',
								error:   '<span class="fas fa-fire"></span>'
							}
						}
					);
					
					$form.on( 'formjs:submit', function ( e, ajaxSetting, ajaxPending ) {
						console.log( 'submit', ajaxSetting, ajaxPending );
					} );
					
					$form.on( 'formjs:ajax-success', function ( e, feedback ) {
						console.log( 'submit-success', feedback );
					} );
					
					$form.on( 'formjs:error', function ( e, error, message, data ) {
						console.log( 'error', error, message, data );
					} );
					
					$form.on( 'formjs:write-alert', function ( e, currentAlert ) {
						console.log( 'write-alert', currentAlert );
					} );

					$( '.style' ).click( function ( e ) {
						var $this = $( this );
						$( '#styleAlert' ).attr( 'href', $this.data( 'path' ) );
						$( '#currentStyle' ).text( $this.text() );
					} );
				</script>
			</body>
		</html>
		<!-- VIEW END -->
    <?php }