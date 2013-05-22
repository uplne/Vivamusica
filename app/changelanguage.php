<?php
	session_start();

	if (isset($_SESSION['language'])){
		$_SESSION['language'] = ($_SESSION['language'] == 'sk') ? 'en' : 'sk';
		header('Location: http://www.vivamusica.sk');
	}
?>