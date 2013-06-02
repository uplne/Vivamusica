<?php

$incdata = '';
$incdata .= "
      <div class=\"novinky-holder jspScrollable\">
        <ul>";

foreach($novinky as $i){
  $incdata .= "<li><a class=\"novinka-box\" href=\"#novinky/".$i['id']."-".$i['seolink_'.$lang]."\" title=\"\"><span>".$i['date']."</span><p>".$i['title_'.$lang]."</p></a></li>";
}
$incdata .= "</ul>
      </div>
      
      <article class=\"text_box novinka\">
      	<div class=\"text_box_wrap\">
          <h3></h3>
          <h4></h4>
          <div class=\"text\">
              <div class=\"text-novinka\">
              </div>
            </div>
          </div>
        </div>
      </article>";
?>