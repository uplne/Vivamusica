<?php
require_once("app/inc/config.inc");

$content = new Content();
$content->init();

$method = $_SERVER['REQUEST_METHOD'];

switch($method) {
	case 'GET': {
		if (isset($_GET['id'])) {
			$id = $_GET['id'];
			$data = $content->dbController->dbSelectOne("SELECT * FROM news WHERE id='".$id."'");
			
			$response = array("id" => $data['id'],"date" => $data['date'],"title"=>$data['title_sk'],"txt"=>$data['text_sk']);
			echo json_encode($response);
		} else {
			$data = $content->dbController->dbSelectAll("SELECT * FROM news ORDER BY id ASC");

			$response = array();

			foreach($data as $i){
		    	array_push($response,array("id" => $i['id'],"date" => $i['date'],"title"=>$i['title_sk'],"txt"=>$i['text_sk']));
			}
			echo json_encode($response);
		}
	} break;
	case 'POST': {
		$box_data = json_decode(file_get_contents('php://input'));
		$date = $box_data->{'date'};
		$title = $box_data->{'title'};
		$txt = $box_data->{'txt'};

		$data = $content->dbController->dbQuery("INSERT INTO news (date,title_sk,text_sk) VALUES ('$date', '$title','$txt')");
		
		$response = array("id" => $content->dbController->dbLastInsertId(),"date" => $date,"title"=>$title,"txt"=>$txt);
		echo json_encode($response);
	} break;
	case 'PUT': {
	    $box_data = json_decode(file_get_contents('php://input'));

	    $id  = $box_data->{'id'};
		$date = $box_data->{'date'};
		$title = $box_data->{'title'};
		$txt = $box_data->{'txt'};

		$data = $content->dbController->dbQuery("UPDATE news SET date='".$date."', title_sk='".$title."', text_sk='".$txt."' WHERE id = $id");
		
		$response = array("id" => $id,"date" => 'test',"title"=>$title,"txt"=>$txt);
		echo json_encode($response);
	} break;
	case 'DELETE': {
		if (isset($_GET['id'])) {
			$id = $_GET['id'];
			$data = $content->dbController->dbQuery("DELETE FROM news WHERE id='".$id."'");
			
			echo $data;
		}
	}
}
?>