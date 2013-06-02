<?php
require_once("app/inc/config.inc");

global $cfg;

$content = new Content();
$content->init();

if (isset($_GET['id'])) {	
	$id = $_GET['id'];
	$data = $content->dbController->dbSelectOne("SELECT * FROM news WHERE id='".$id."'");
	
	$response = array("id" => $data['id'],"date" => $data['date'],"title"=>$data['title_sk'],"txt"=>$data['text_sk']);
	echo json_encode($response);
}
?>