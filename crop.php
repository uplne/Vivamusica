<?php

/**
 * Jcrop image cropping plugin for jQuery
 * Example cropping script
 * @copyright 2008-2009 Kelly Hallman
 * More info: http://deepliquid.com/content/Jcrop_Implementation_Theory.html
 */

if ($_SERVER['REQUEST_METHOD'] == 'POST')
{
	$targ_w = 100;
  $targ_h = 250;
	$jpeg_quality = 90;

	$src = 'pool.jpg';
	$img_r = imagecreatefromjpeg($src);
	$dst_r = ImageCreateTrueColor( $targ_w, $targ_h );

	imagecopyresampled($dst_r,$img_r,0,0,$_POST['x'],$_POST['y'],
	$targ_w,$targ_h,$_POST['w'],$_POST['h']);

	header('Content-type: image/jpeg');
	imagejpeg($dst_r,null,$jpeg_quality);

	exit;

  function cropFile($data){
  
      $image = '';
      $full_path = SERVER_ROOT."images/postcards_temp/";
      
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
      $quality = 80;
      $dst_r   = imagecreatetruecolor(476, 356);
      
      $ratio = $src_w / 476;
      
      $new_x = $_POST['x'] * $ratio;
      $new_y = $_POST['y'] * $ratio;
      $new_width = $_POST['w'] * $ratio;
      $new_height = $_POST['h'] * $ratio;
      
      //imagecopyresampled ( resource $dst_image , resource $src_image , int $dst_x , int $dst_y , int $src_x , int $src_y , int $dst_w , int $dst_h , int $src_w , int $src_h )
      
      imagecopyresampled($dst_r, $image, 0, 0, $new_x, $new_y, 476, 356, $new_width, $new_height);
      
      $output = SERVER_ROOT."images/postcards/".$data['img']; 
      imagejpeg($dst_r, $output, $quality);

    return true;
  }

  $image = cropFile($_POST);
  if($image) echo 1;
  else echo 2;
  }
}

// If not a POST request, display page below:

?><!DOCTYPE html>
<html lang="en">
<head>
  <title>Live Cropping Demo</title>
  <meta http-equiv="Content-type" content="text/html;charset=UTF-8" />
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.8.1/jquery.min.js"></script>
  <script src="assets/scripts/js/admin/jquery.Jcrop.min.js"></script>
  <link rel="stylesheet" href="jquery.Jcrop.css" type="text/css" />

<script type="text/javascript">

  $(function(){

    $('#cropbox').Jcrop({
      aspectRatio: .8,
      onSelect: updateCoords
    });

  });

  function updateCoords(c)
  {
    $('#x').val(c.x);
    $('#y').val(c.y);
    $('#w').val(c.w);
    $('#h').val(c.h);
  };

  function checkCoords()
  {
    if (parseInt($('#w').val())) return true;
    alert('Please select a crop region then press submit.');
    return false;
  };

</script>
<style type="text/css">
  #target {
    background-color: #ccc;
    width: 500px;
    height: 330px;
    font-size: 24px;
    display: block;
  }


</style>

</head>
<body>

<div class="container">
<div class="row">
<div class="span12">
<div class="jc-demo-box">

<div class="page-header">
<ul class="breadcrumb first">
  <li><a href="../index.html">Jcrop</a> <span class="divider">/</span></li>
  <li><a href="../index.html">Demos</a> <span class="divider">/</span></li>
  <li class="active">Live Demo (Requires PHP)</li>
</ul>
<h1>Server-based Cropping Behavior</h1>
</div>

		<!-- This is the image we're attaching Jcrop to -->
		<img src="pool.jpg" id="cropbox" />

		<!-- This is the form that our event handler fills -->
		<form action="crop.php" method="post" onsubmit="return checkCoords();">
			<input type="hidden" id="x" name="x" />
			<input type="hidden" id="y" name="y" />
			<input type="hidden" id="w" name="w" />
			<input type="hidden" id="h" name="h" />
			<input type="submit" value="Crop Image" class="btn btn-large btn-inverse" />
		</form>

		<p>
			<b>An example server-side crop script.</b> Hidden form values
			are set when a selection is made. If you press the <i>Crop Image</i>
			button, the form will be submitted and a 150x150 thumbnail will be
			dumped to the browser. Try it!
		</p>


	</div>
	</div>
	</div>
	</div>
	</body>

</html>
