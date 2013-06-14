<?php

function getExtension($str) {
	$i = strrpos($str,".");
	if(!$i) return "";
	$l = strlen($str) - $i;
	$ext = substr($str,$i+1,$l);
  return strtolower($ext);
}
function get_full_url() {
    $https = !empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off';
    return
        ($https ? 'https://' : 'http://').
        (!empty($_SERVER['REMOTE_USER']) ? $_SERVER['REMOTE_USER'].'@' : '').
        (isset($_SERVER['HTTP_HOST']) ? $_SERVER['HTTP_HOST'] : ($_SERVER['SERVER_NAME'].
        ($https && $_SERVER['SERVER_PORT'] === 443 ||
        $_SERVER['SERVER_PORT'] === 80 ? '' : ':'.$_SERVER['SERVER_PORT']))).
        substr($_SERVER['SCRIPT_NAME'],0, strrpos($_SERVER['SCRIPT_NAME'], '/'));
}
function get_server_var($id) {
    return isset($_SERVER[$id]) ? $_SERVER[$id] : '';
}
function cropFile($data){
  
	$image = '';
	$full_path = get_full_url()."/server/php/files/thumbnail/";
	
	switch(getExtension($data['img'])){
		case 'jpg':
		case 'jpeg':
		  $image = imagecreatefromjpeg($full_path.$data['img']);
		  break;
		case 'png':
		  $image = imagecreatefrompng($full_path.$data['img']);
			break;
		case 'gif':
		  $image = imagecreatefromgif($full_path.$data['img']);
			break;
	}
	
	$src_s   = getimagesize($full_path.$data['img']);
  	$src_w   = $src_s[0]; 
	$src_h   = $src_s[1];
	$quality = 100;
	$dst_r   = imagecreatetruecolor($_POST['w'], $_POST['h']);
	
	imagecopyresampled($dst_r, $image, 0, 0, $_POST['x'], $_POST['y'], $_POST['w'], $_POST['h'], $_POST['w'], $_POST['h']);
	
	$output = dirname(get_server_var('SCRIPT_FILENAME'))."/server/php/files/final/".$data['img'];	
	imagejpeg($dst_r, $output, $quality);

  return true;
}

$image = cropFile($_POST);
if($image) echo 1;
else echo 2;

?>