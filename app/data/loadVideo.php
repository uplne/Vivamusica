<?php
require_once("/www/v/i/u11751/public_html/app/inc/config.inc");

global $cfg;

$DB = new mysqlDB();
$DB->dbConnect();

if (isset($_GET['videoid'])) {
	$id = $_GET['videoid'];
	
	$data = $DB->dbSelectOne("SELECT * FROM video WHERE id = ".$id."");
	if ($id == 8) {
		$returndata = "<div style=\"padding-top: 20px;\" width=\"498\" height=\"280\"><iframe width=\"497\" height=\"280\" src=\"http://www.youtube.com/embed/nN9i8q9PWvA\" frameborder=\"0\" allowfullscreen></iframe></div>";	
	} else {
	$returndata = "<video class=\"video\" width=\"498\" height=\"280\" poster=\"".$cfg['MediaDir']."/thumb/".$data['src'].".jpg\" controls=\"controls\" tabindex=\"0\">
        <source src=\"".$cfg['MediaDir'].$data['src'].".webm\" type='video/webm; codecs=\"vp8, vorbis\"' />
        <source src=\"".$cfg['MediaDir'].$data['src'].".mp4\" type='video/mp4; codecs=\"avc1.42E01E, mp4a.40.2\"' />
        <source src=\"".$cfg['MediaDir'].$data['src'].".ogv\" type='video/ogg; codecs=\"theora, vorbis\"' />
				<embed src=\"".$data['fallback']."\" type=\"application/x-shockwave-flash\" width=\"498\" height=\"280\" allowscriptaccess=\"always\" allowfullscreen=\"true\"></embed> 
	    </video>";
	}
	
	echo $returndata;
}
?>