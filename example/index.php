<?php
	/**
 * Copyright (c) 2018.  JAGFx
 * @author: SMITH Emmanuel
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
		<html lang="en" >
			<head >
				<meta charset="UTF-8" >
				<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" >
				
				<title >jQuery feedback plugin - Example</title >
				
				<link rel="stylesheet" href="../node_modules/bootstrap/dist/css/bootstrap.min.css" >
				<link rel="stylesheet" href="../node_modules/@fortawesome/fontawesome-free-webfonts/css/fa-solid.css" >
				<link rel="stylesheet" href="../node_modules/@fortawesome/fontawesome-free-webfonts/css/fontawesome.css" >
				
				<link href="https://fonts.googleapis.com/css?family=Quicksand" rel="stylesheet" >
				
				<link rel="stylesheet" href="../dist/css/theme-flat/formJS-flat.css" id="styleAlert" >
				
				<style >
					body { background: #f7f7f7; }
				</style >
			</head >
			<body class="container" >
				<div class="row" >
					<div class="col-12" >
						<div class="card mt-5" >
							<div class="card-header d-flex justify-content-between align-items-center" >
								FormJS example
								<div class="btn-group" >
									<button class="btn btn-secondary btn-sm" type="button" >
										Style: <span id="currentStyle" >Flat</span >
									</button >
									<button type="button" class="btn btn-sm btn-secondary dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" >
										<span class="sr-only" >Toggle Dropdown</span >
									</button >
									<div class="dropdown-menu  dropdown-menu-right" >
										<a class="dropdown-item style" href="#" data-path="../dist/css/theme-bs/formJS-bs.css" >Bootstrap 3/4</a >
										<a class="dropdown-item style" href="#" data-path="../dist/css/theme-cust/formJS-cust.css" >Custom</a >
										<a class="dropdown-item style" href="#" data-path="../dist/css/theme-flat/formJS-flat.css" >Flat</a >
									</div >
								</div >
							</div >
							<div class="card-body" >
								<div class="card-text" >
									<form action="" id="formJS" method="post" class="col-12" >
										<div class="form-group" >
											<label for="typeFeedback" >Type of feedback</label >
											<div class="custom-control custom-radio" >
												<input type="radio" class="custom-control-input" name="typeFeedback" id="Success" value="success" checked >
												<label class="custom-control-label" for="Success" >Success</label >
											</div >
											<div class="custom-control custom-radio" >
												<input type="radio" class="custom-control-input" name="typeFeedback" id="Info" value="info" >
												<label class="custom-control-label" for="Info" >Info</label >
											</div >
											<div class="custom-control custom-radio" >
												<input type="radio" class="custom-control-input" name="typeFeedback" id="Warning" value="warning" >
												<label class="custom-control-label" for="Warning" >Warning</label >
											</div >
											<div class="custom-control custom-radio" >
												<input type="radio" class="custom-control-input" name="typeFeedback" id="Error" value="error" >
												<label class="custom-control-label" for="Error" >Error</label >
											</div >
										</div >
										
										<button type="submit" class="btn btn-primary" >Try</button >
									</form >
								</div >
							</div >
						</div >
					</div >
				
				</div >
				
				<script src="../node_modules/jquery/dist/jquery.js" ></script >
				<script src="../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js" ></script >
				<script src="../dist/formJS.js" ></script >
				
				<script >
					$( '#formJS' ).formJS();

					$( '.style' ).click( function ( e ) {
						var $this = $( this );
						$( '#styleAlert' ).attr( 'href', $this.data( 'path' ) );
						$( '#currentStyle' ).text( $this.text() );
					} );
				</script >
			</body >
		</html >
		<!-- VIEW END -->
	<?php }