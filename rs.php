<?php
	require_once("app/inc/config.inc");

	$content = new Content();
	$content->init();

	$name = $_POST["name"];
	$pswd = $_POST["pswd"];
	$hash = sha1($pswd);

	$data = $content->dbController->dbSelectOne("SELECT * FROM admusers WHERE name='".$name."'");

	if (!$data) {
		echo 'Zly login.';
	} else {
		if ($data['pswd'] == $hash) {
			$_SESSION['logged'] = 'in';
		} else {
			echo 'Zle heslo.';
		}
	}

	if ($_SESSION['logged'] == 'in') {
?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
	<meta name="robots" content="no-follow">
	<link rel="Stylesheet" type="text/css" href="assets/styles/css/htmleditor.css" />
  	<link rel="stylesheet" type="text/css" media="all" href="assets/styles/css/admin.css">
  	<link rel="stylesheet" href="assets/styles/css/jquery.fileupload-ui.css">
	<title>Vivamusica! Backend</title> 
  <!--[if lt IE 9]>
		<script src="//html5shiv.googlecode.com/svn/trunk/html5.js"></script>
	<![endif]-->
</head>
<body contentEditable="false">
	<div id="main">
	    <h1><img src="assets/images/logoemail.jpg" width="180" height="153" /></h1>
	    <nav>
	    	<a class="active rounded" href="" title="Novinky">Novinky</a>
	    </nav> <!-- Main menu -->

	    <section>
	    	<a class="button new rounded">Pridat novu</a>
	    	<ul class="novinky">

	    	</ul>
	    </section> <!-- Main content holder -->

	    <section class="add-form">
	    	<h2>Pridat novinku</h2>
	    	<form id="form-add-news" action="#" method="POST">
	    		<label for="date">Datum:</label>
	    		<input class="rounded" type="text" name="date" value="" />
	    		<label for="title">Nazov:</label>
	    		<input class="rounded" type="text" name="title" value="" />
	    		<label for="text">Text:</label>
	    		<textarea id="txt" name="text" cols="50" rows="15"></textarea>
	    		<div class="buttrow">
	    			<input id="fileupload" type="file" name="files[]" data-url="server/php/" multiple>
	    		</div>
	    		<button class="button save rounded">Ulozit</button>
	    		<button class="button cancel rounded">Zrusit</button>
	    	</form>
	    	<div class="imageholder"></div>
	    </section>

	</div>
	<!-- Libraries -->
	<script src="//ajax.googleapis.com/ajax/libs/jquery/1.8.1/jquery.min.js"></script>
	<!-- Plugins -->
  	<script src="assets/scripts/js/plugins/jquery.easing.1.3.js"></script>
	<!-- Project -->
	<script src="assets/scripts/js/admin/json2.js"></script>
	<script src="assets/scripts/js/admin/underscore-min.js"></script>
	<script src="assets/scripts/js/admin/backbone-min.js"></script>
	<script src="assets/scripts/js/admin/jHtmlArea.js"></script>
	<!-- The jQuery UI widget factory, can be omitted if jQuery UI is already included -->
	<script src="assets/scripts/js/admin/vendor/jquery.ui.widget.js"></script>
	<!-- The Iframe Transport is required for browsers without support for XHR file uploads -->
	<script src="assets/scripts/js/admin/jquery.iframe-transport.js"></script>
	<!-- The basic File Upload plugin -->
	<script src="assets/scripts/js/admin/jquery.fileupload.js"></script>
	<script src="assets/scripts/js/admin/master.js"></script>
</body>
</html>
<?php
	} else {
		header("Location: viva.php");
		exit;
	}
?>