<?php
	/**
	 * Created by PhpStorm.
	 *
	 * @author: SMITH Emmanuel
	 * Date: 14-Jun-18
	 * Time: 19:40
	 */
	
	if ( isset( $_POST[ 'typeFeedback' ] ) ) {
		// Post traitment
		sleep( 2 );
		echo json_encode(
			[
				'type' => 'error',
				/*'url'  => '',*/
				'data' => [
					'title'   => 'Info',
					'message' => 'I love FormJS <3 !'
				]
			]
		);
		
	} else { ?>
		<!-- VIEW START -->
		<!DOCTYPE html>
		<html lang="en" >
			<head >
				<meta charset="UTF-8" >
				<title >FormJS Example</title >
				<link rel="stylesheet" href="../node_modules/bootstrap/dist/css/bootstrap.min.css" >
				<link rel="stylesheet" href="../node_modules/@fortawesome/fontawesome-free-webfonts/css/fa-solid.css" >
				<link rel="stylesheet" href="../node_modules/@fortawesome/fontawesome-free-webfonts/css/fontawesome.css" >
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