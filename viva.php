<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
	<meta name="robots" content="no-follow">
  <link rel="stylesheet" type="text/css" media="all" href="assets/styles/css/admin.css">
	<title>Vivamusica! Backend</title> 
  <!--[if lt IE 9]>
		<script src="//html5shiv.googlecode.com/svn/trunk/html5.js"></script>
	<![endif]-->
</head>
<body contentEditable="false">
	<div id="main">
	    <h1><img src="assets/images/logoemail.jpg" width="180" height="153" /></h1>
	    <section>
			<form id="form-login" action="viva.php" method="post">
				<label for="name">Login: </label>
				<input type="text" name="name" value="" />
				<label for="pwd">Heslo: </label>
				<input type="password" name="pwd" value="" />
				<button class="btn-login">Login</button>
			</form>
		</section>
	</div>
	<!-- Libraries -->
	<script src="//ajax.googleapis.com/ajax/libs/jquery/1.8.1/jquery.min.js"></script>
	<!-- Plugins -->
  	<script src="assets/scripts/js/plugins/jquery.easing.1.3.js"></script>
	<!-- Project -->
	<script src="assets/scripts/js/admin/master.js"></script>
	<script src="assets/scripts/js/admin/json2.js"></script>
	<script src="assets/scripts/js/admin/underscore-min.js"></script>
	<script src="assets/scripts/js/admin/backbone-min.js"></script>
	<script>
  	$(document).ready(function() {
	
	});
  </script>
</body>
</html>