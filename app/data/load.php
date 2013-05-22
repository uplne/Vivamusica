<?php
//require_once("/www/v/i/u11751/public_html/app/inc/config.inc");
require_once(getcwd().'/../../app/inc/config.inc');

$content = new Content();
$content->init();

if (isset($_GET['page'])) {
	$page = $_GET['page'];
	
	if ($content->sessionController->getLanguage() == 'sk') {
		switch($page) {
			case 'program' : {
				$returndata = $content->templateController->getProgam();
			} break;
			case 'festival' : {
				$returndata = $content->templateController->getFestival();
			} break;
			case 'vstupenky' : {
				$returndata = $content->templateController->getTickets();
			} break;
			case 'team' : {
				$returndata = $content->templateController->getTeam();
			} break;
			case 'partneri' : {
				$returndata = $content->templateController->getPartneri();
			} break;
			case 'kontakt' : {
				$returndata = $content->templateController->getKontakt();
			} break;
			case 'novinky' : {
				$returndata = $content->templateController->getNovinky();
			} break;
			case 'media' : {
				$returndata = $content->templateController->getMedia();
			} break;
			case 'tricka' : {
				$returndata = $content->templateController->getTricka();
			} break;
			case 'skolka' : {
				$returndata = $content->templateController->getSkolka();
			} break;
			case 'sien-slavy' : {
				$returndata = $content->templateController->getSienslavy();
			} break;
		}
	} else {
		switch($page) {
			case 'program' : {
				$returndata = $content->templateController->getProgam();
			} break;
			case 'festival' : {
				$returndata = $content->templateController->getFestival();
			} break;
			case 'tickets' : {
				$returndata = $content->templateController->getTickets();
			} break;
			case 'team' : {
				$returndata = $content->templateController->getTeam();
			} break;
			case 'partners' : {
				$returndata = $content->templateController->getPartneri();
			} break;
			case 'contact' : {
				$returndata = $content->templateController->getKontakt();
			} break;
			case 'media' : {
				$returndata = $content->templateController->getMedia();
			} break;
			case 'hall-of-fame' : {
				$returndata = $content->templateController->getSienslavy();
			} break;
		}
	}
	echo $returndata;
}
?>