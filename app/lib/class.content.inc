<?php
class Content
{
	public $conf;
	public $sessionController;
	public $templateController;
	public $dbController;
	
	private $template;
	
	function __construct(){
		global $cfg;
		
		$this->conf	= $cfg;
	}
	
	function init() {
		// Init session controller
		$this->sessionController = new SessionController();
		$this->sessionController->createSession();
		if(!isset($_SESSION['language'])) $this->sessionController->setLanguage('sk');
				
		// Init tempalte controller
		$this->templateController = new TemplateController($this);
		
		// Init DB controller
		$this->dbController = new mysqlDB();
		$this->dbController->dbConnect();
	}
	
	function showIndexContent(){
		// Load index page
		$this->showPage();
	}
	
	function showAdminIndexContent(){
		// Load index page
		$this->showAdminPage();
	}
	
	function showPage(){
		$file = $this->conf['TemplateFile'];
		if ($this->sessionController->getLanguage() == 'en') $file .= '_en';
		
		$template = $this->templateController->useTemplate($file);
		$str = str_replace('xLANGx',"'".$this->sessionController->getLanguage()."'",$template);
		
		print($str);
	}
	
	function showAdminPage(){
		$file = 'admin';
		
		$template = $this->templateController->useTemplate($file);
		$str = str_replace('xTRICKAx',$this->templateController->getTrickaList(),$template);
		
		print($str);
	}
	
	function tickets($ticketsBol, $ticketlink, $title) {
		$txt_sk = array('Rezervuj vstupenku','vstupenky','Rezervuj vstupenku','* voľný vstup');
		$txt_en = array('Buy tickets','tickets','Tickets','* free admission');
		
		$txt = ($this->sessionController->getLanguage() == 'sk') ? $txt_sk : $txt_en;
		
		if ($ticketsBol) {
			if ($ticketlink) {
				$ticket = "<a href=\"".$ticketlink."\" title=\"".$title."\" target=\"_blank\">".$txt[0]."</a>";
			} else {
				$ticket = "<a href=\"#/".$txt[1]."\" title=\"".$txt[2]."\">".$txt[2]."</a>";
			}
		} else {
			$ticket = "".$txt[3]."";
		}
		return $ticket;
	}
}
?>