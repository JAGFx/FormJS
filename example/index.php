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
				
				<title >FormJS Example</title >
				
				<link rel="stylesheet" href="../node_modules/bootstrap/dist/css/bootstrap.min.css" >
				<link rel="stylesheet" href="../node_modules/@fortawesome/fontawesome-free-webfonts/css/fa-solid.css" >
				<link rel="stylesheet" href="../node_modules/@fortawesome/fontawesome-free-webfonts/css/fontawesome.css" >
				
				<link rel="stylesheet" href="../dist/formJS.css" >
			</head >
			<body class="container" >
				<div class="row" >
					<h1 class="col-12" >FormJS example</h1 >
					<form action="" id="formJS" method="post" class="col-12" >
						<div class="form-group" >
							<label for="typeFeedback" >Type of feedback</label >
							<select name="typeFeedback" id="typeFeedback" class="form-control" >
								<option value="success" >Success</option >
								<option value="info" >Info</option >
								<option value="warning" >Warning</option >
								<option value="error" >Error</option >
							</select >
						</div >
						
						<button type="submit" class="btn btn-primary" >Try</button >
					</form >
				</div >
				
				<script src="../node_modules/jquery/dist/jquery.js" ></script >
				<script src="../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js" ></script >
				<script src="../dist/formJS.js" ></script >
				
				<script >
					$( '#formJS' ).formJS();
				</script >
			</body >
		</html >
		<!-- VIEW END -->
	<?php }