<?

if ($lang == 'sk') {
	$historialink = "<li><a class=\"historia\" href=\"#festival/historia/\" title=\"\">História</a></li>";
} else {
	$historialink = "<li><a class=\"historia\" href=\"#festival/history/\" title=\"\">History</a></li>";
}



$incdata = '';
$incdata .= "<ul>
      	<li><a class=\"festival\" href=\"#festival\" title=\"\">Festival</a></li>
        ".$historialink."
      </ul>
    	<article class=\"text_box festivalBox\">
      	<div class=\"text_box_wrap\">
          <div class=\"center\">
              <div class=\"scroll-pane festival jspScrollable\">
                ".$festival['text_'.$lang]."
              </div>
          </div>
        </div>
      </article>
      
      <article class=\"text_box festival_historia\">
      	<div class=\"text_box_wrap\">
          <div class=\"center\">
          <div class=\"image_holder\">
          	<span>2006</span>
            <img src=\"assets/images/festival/2006.png\" width=\"167\" height=\"260\" alt=\"Festivalova historia\" />
          </div>
          <div class=\"text\">
              <div class=\"scroll-pane festival_historia jspScrollable\">
								".$historia['text_'.$lang]."
              </div>
            </div>
          </div>
        </div>
      </article>";
?>