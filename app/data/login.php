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
		echo 'success';
	} else {
		echo 'Zle heslo.';
	}
}
?>