<?php
class TemplateController
{
	private $templateDir;
	private $imagesDir;
	private $htmlDir;
	private $parentClass;
	private $videoDir;
	
	function __construct($parentClass){
		global $cfg;
		
		$this->templateDir = $cfg['TemplateDir'];
		$this->imagesDir   = $cfg['ImagesDir'];
		$this->htmlDir     = $cfg['HtmlDir'];
		$this->mediaDir    = $cfg['MediaDir'];
		$this->parentClass = $parentClass;
	}
	
	public function checkTemplate($file){
		$tmp_file = $this->templateDir . $file .'.tpl';
		if(@file_exists($tmp_file)) return true;
		else return false;
		
	}	
	
	public function useTemplate($file){
		if($this->checkTemplate($file)){
			$template = @implode("",file($this->templateDir. $file .'.tpl'));
			return $template;
		}
		else return false;
	}
	
	public function includeTemplateBlock($file){
		if($this->checkTemplate($file)){
			$fp = @fopen($this->templateDir. $file .'.tpl','r');
			$content = @fread($fp,@filesize($this->templateDir. $file .'.tpl'));
			@fclose($fp);
			return $content;
		}
		else return false;
	}
	
	public function includeFile($file){
		$include_file = $this->htmlDir.$file.'.inc';
		if(@file_exists($include_file)) @include_once($include_file);
		
		return $incdata;
	}
	
	/* Function for generating program */
	public function getProgam(){
		$programdata = $this->parentClass->dbController->dbSelectAll("SELECT * FROM program ORDER BY id");
		$lang = $this->parentClass->sessionController->getLanguage();
		$linkdata = '';
		$articledata = '';
		$pozvanka = '';
		
		$index = 1;
		foreach($programdata as $i){
			$sublink = $index.'-'.$i['seolink_'.$lang];
			if ($i['seolink_sk']) {
			$linkdata .= "<a class=\"thumbBox thumbBox".$index."\" href=\"#program/".$sublink."\" title=\"\">
      	<time class=\"date\">".$i['date_'.$lang]."</time>
        <h3>".$i['title_'.$lang]."</h3>
      </a>";
			} else {
				$linkdata .= "<a class=\"thumbBox thumbBox".$index."\" title=\"\">
      	<time class=\"date\">".$i['date_'.$lang]."</time>
        <h3>".$i['title_'.$lang]."</h3>
      </a>";	
			}
			if ($i['seolink_sk']) {
			$articledata .= "<article id=\"program".$index."\" class=\"text_box program_detail\">
					<div class=\"text_box_wrap\">
						<h3>".$i['title_'.$lang]."</h3>
						<h4>".$i['date_'.$lang].", ".$i['time']." <span>".$i['place_'.$lang]."</span></h4>
						<div class=\"center\">
							<div class=\"image_holder\">
								<img src=\"".$this->imagesDir."fotky/program/".$i['img']."\" width=\"179\" height=\"244\" alt=\"".$i['title_'.$lang]."\" />
							</div>
							<aside class=\"text\">
								<div class=\"scroll-pane program jspScrollable\">
									<p>".$i['text_'.$lang]."</p>
								</div>
								<div class=\"bottom\">
									<div class=\"fb-like\" data-href=\"http://www.vivamusica.sk/#program/".$sublink."\" data-send=\"false\" data-layout=\"button_count\" data-width=\"100\" data-show-faces=\"false\" data-font=\"trebuchet ms\"></div>
									<p class=\"vstupne\">".$this->parentClass->tickets($i['tickets'],$i['ticketlink'],$i['title_'.$lang])."</p>
								</div>
							</aside>
						</div>
					</div>
				</article>";
			}
				
			$index++;
		}

		$pozvanka = "<a class=\"pozvanka\" href=\"#pozvanka\">Pozvanka na Viva Musica!</a>";
		
		$htmldata = $linkdata;
		$htmldata .= $articledata;
		$htmldata .= $pozvanka;
		
		return $htmldata;
	}
	
	/* Function for generating festival page */
	public function getFestival(){
		$festival = $this->parentClass->dbController->dbSelectOne("SELECT * FROM content WHERE name='festival'");
		$historia = $this->parentClass->dbController->dbSelectOne("SELECT * FROM content WHERE name='history'");
		$lang = $this->parentClass->sessionController->getLanguage();
		
		$include_file = $this->htmlDir.'festival.inc';
		if(@file_exists($include_file)) @include_once($include_file);
			
		return $incdata;
	}

	/* Function for generating novinky page */
	public function getNovinky(){
		$novinky = $this->parentClass->dbController->dbSelectAll("SELECT * FROM news ORDER BY id DESC");
		$lang = $this->parentClass->sessionController->getLanguage();
		
		$include_file = $this->htmlDir.'novinky.inc';
		if(@file_exists($include_file)) @include_once($include_file);
			
		return $incdata;
	}
	
	/* Function for generating vstupenky page */
	public function getTickets(){
		$data = $this->parentClass->dbController->dbSelectOne("SELECT * FROM content WHERE name='tickets'");
		$lang = $this->parentClass->sessionController->getLanguage();
		
		$include_file = $this->htmlDir.'vstupenky.inc';
		if(@file_exists($include_file)) @include_once($include_file);
			
		return $incdata;
	}
	
	/* Function for generating skolka page */
	public function getSkolka(){
		$data = $this->parentClass->dbController->dbSelectOne("SELECT * FROM content WHERE name='skolka'");
		$lang = $this->parentClass->sessionController->getLanguage();
		
		$include_file = $this->htmlDir.'skolka.inc';
		if(@file_exists($include_file)) @include_once($include_file);
			
		return $incdata;
	}
	
	/* Function for generating team page */
	public function getKontakt() {
		$data = $this->parentClass->dbController->dbSelectAll("SELECT * FROM team ORDER BY id");
		$lang = $this->parentClass->sessionController->getLanguage();
		
		$index = 1;
		foreach($data as $i){
			$sublink = ($index > 1) ? $index.'-'.$i['seolink_'.$lang] : '';
			$navdata .= "<li><a class=\"name".$index."\" href=\"#/kontakt/".$sublink."\" title=\"".$i['name']."\">".$i['name']."</a></li>";
			if ($i['name'] == 'Kontakt') {
				$articledata .= "<article class=\"text_box team box".$index."\"><div class=\"text_box_wrap\">
          <div class=\"center\"><ul class=\"kontakt\"><li><p><strong>Riaditeľ festivalu</strong></p><p>Matej Drlička</p><a href=\"\" title=\"\">matej@vivamusica.sk</a></li>
		  <li>
          	<p><strong>Account manager</strong></p>
            <p>Štefan Čermák</p>
            <a href=\"\" title=\"\">stefan@vivamusica.sk</a>
            <p>+421 904 145 999</p>
          </li>
          <li>
          	<p><strong>Project manager</strong></p>
            <p>Janka Kubandová</p>
            <a href=\"\" title=\"\">janka@vivamusica.sk</a>
            <p>+421 948 607 200</p>
          </li>
          <li>
          	<p><strong>PR manager</strong></p>
            <p>Barbora Drahovská</p>
            <a href=\"\" title=\"\">barbora@vivamusica.sk</a>
            <p>+ 421 903 310 411</p>
          </li>
        </ul></div></div>
      </article>";
			} else {
			$articledata .= "<article class=\"text_box team box".$index."\">    	
      	<div class=\"text_box_wrap\">
          <div class=\"center\">
          <div class=\"image_holder\">
            <img src=\"".$this->imagesDir."fotky/team/".$i['img']."\" width=\"179\" height=\"244\" alt=\"".$i['name']."\" />
          </div>
          <div class=\"text\">
          		<p class=\"position\">".$i['title_'.$lang]."</p>
              <h3>".$i['name']."</h3>
              <p class=\"main-copy\">".$i['text_'.$lang]."</p>
          </div>
        </div>
       </article>";
			}
			 						
			$index++;
		}
		
		$include_file = $this->htmlDir.'kontakt.inc';
		if(@file_exists($include_file)) @include_once($include_file);
		
		return $htmldata;
	}
	
	/* Function for generating partneri page */
	public function getPartneri(){
		$include_file = $this->htmlDir.'partneri.inc';
		if(@file_exists($include_file)) @include_once($include_file);
		
		return $htmldata;
	}
	
	/* Function for generating kontakt page */
	/*public function getKontakt(){
		$include_file = $this->htmlDir.'kontakt.inc';
		if(@file_exists($include_file)) @include_once($include_file);
		
		return $htmldata;
	}*/
	
	/* Function for generating tricka page */
	public function getTricka(){
		$include_file = $this->htmlDir.'tricka.inc';
		if(@file_exists($include_file)) @include_once($include_file);
		
		return $htmldata;
	}
	
	/* Function for generating media page */
	public function getMedia(){
		$data = $this->parentClass->dbController->dbSelectAll("SELECT * FROM video ORDER BY id DESC");
		$lang = $this->parentClass->sessionController->getLanguage();
		
		$index = 1;
		foreach($data as $i){
			$sublink = $index.'-'.$i['seolink_'.$lang];
			$navdata .= "<a class=\"thumbBox mediaBox".$index."\" href=\"#media/".$i['id'].'-'.$i['seolink_'.$lang]."\" title=\"".$i['title_'.$lang]."\">
        <h3>".$i['title_'.$lang]."</h3>
      </a>";
						 						
			$index++;
		}
		
		return $navdata;
	}
	
	/* Function for generating sien slavy page */
	public function getSienslavy(){
		$data = $this->parentClass->dbController->dbSelectAll("SELECT * FROM halloffame ORDER BY gid ASC");
		$lang = $this->parentClass->sessionController->getLanguage();
		
		$index = 1;
		foreach($data as $i){
			$sublink = ($index > 1) ? $index.'-'.$i['seolink'] : '';
			$link    = ($lang == 'sk') ? 'sien-slavy' : 'hall-of-fame';
			$dockdata .= "<li><a class=\"name".$index."\" href=\"#/".$link."/".$sublink."\" title=\"".$i['name']."\"><img src=\"".$this->imagesDir."fotky/sien/dock/".$i['img'].".png\" width=\"100\" height=\"145\" alt=\"\" /></a></li>";
			$articledata .= "<article id=\"sien".$index."\" class=\"text_box sien_detail\">
					<div class=\"text_box_wrap\">
						<h3>".$i['name']."</h3>
						<h4>".$i['year']."</span></h4>
						<div class=\"center\">
							<div class=\"image_holder\">
								<img src=\"".$this->imagesDir."fotky/sien/".$i['img'].".jpg\" width=\"179\" height=\"244\" alt=\"".$i['title_'.$lang]."\" />
							</div>
							<aside class=\"text\">
								<div class=\"scroll-pane program jspScrollable\">
									".$i['text_'.$lang]."
								</div>
							</aside>
						</div>
					</div>
				</article>";
			 						
			$index++;
		}
		
		$include_file = $this->htmlDir.'sien-slavy.inc';
		if(@file_exists($include_file)) @include_once($include_file);
		
		return $htmldata;
	}
	
	/* Function for generating Tricka Admin */
	public function getTrickaList(){
		if (isset($_POST['name']) && isset($_POST['pwd'])) {
			if (($_POST['name'] == "janka") && ($_POST['pwd'] == 'vivatricka09')) {
				$_SESSION['logged'] = 'in';
			}
		}
		if (isset($_GET['page'])) {
			if ($_GET['page'] == 'logout') {
				$_SESSION['logged'] = '';
			}
		}
		
		if ($_SESSION['logged'] == 'in') {
			$htmldata = "<header id=\"header\">
  	<h1><img src=\"assets/images/logoemail.jpg\" width=\"180\" height=\"153\" alt=\"\" /></h1>
    <h2>Tričká</h2>
		<a class=\"logout\" href=\"/rs.php?page=logout\" title=\"Log out\">Odhlásiť</a>
  </header>
  <section>
  	<div class=\"rowtop\">
    	<span class=\"row_clm picture\">Picture</span>
      <span class=\"row_clm name\">Name</span>
      <span class=\"row_clm email\">E-mail</span>
      <span class=\"row_clm\">Strih</span>
      <span class=\"row_clm\">Motív</span>
      <span class=\"row_clm\">Veľkosť</span>
      <span class=\"row_clm\">Počet</span>
    </div>";
		
			$data = $this->parentClass->dbController->dbSelectAll("SELECT * FROM reservations ORDER BY id");
			
			$index = 1;
			foreach($data as $i){
				$row = (($i % 2) == 0) ? 'bg' : '';
				$htmldata .= "<div class=\"row ".$row."\">
    	<div class=\"row_clm tricko".$i['tricko']."\">
      	<span class=\"motiv motiv".$i['motiv']."\"></span>
      </div>
      <span class=\"row_clm name\">".$i['name']."</span>
      <span class=\"row_clm email\">".$i['email']."</span>
      <span class=\"row_clm\">".$i['tricko']."</span>
      <span class=\"row_clm\">".$i['motiv']."</span>
      <span class=\"row_clm\">".$i['velkost']."</span>
      <span class=\"row_clm\">".$i['pocet']."</span>
    </div>";
										
				$index++;
			}
		} else {
			$htmldata = "<header id=\"loginheader\">
				<h1><img src=\"assets/images/logoemail.jpg\" width=\"180\" height=\"153\" alt=\"\" /></h1>
			</header>
			<section>
				<form action=\"/rs.php\" method=\"post\">
					<label for=\"name\">Login: </label>
					<input type=\"text\" name=\"name\" value=\"\" />
					<label for=\"pwd\">Heslo: </label>
					<input type=\"password\" name=\"pwd\" value=\"\" />
					<input type=\"submit\" name=\"submit\" value=\"Login\" />
				</form>
			</section>";
		}
		
		return $htmldata;
	}
}

?>