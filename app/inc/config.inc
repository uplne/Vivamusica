<?php
	$cfg['DomainName']			= 'http://www.vivamusica.sk/';
	
	#  INDEX Template
	$cfg['TemplateFile']		= 'index';
	
	#  error email
	$cfg['ErrorsToEmail']		= 'uplneinak@gmail.com';
	
	# Server Dirs
	$cfg['SiteDir']				= 'C:/xampp/htdocs/vivamusica/';///www/v/i/u11751/public_html/';
	$cfg['RootDir']				= '/vivamusica/';
	$cfg['TemplateDir']			= $cfg['SiteDir'].'app/data/templates/';
	$cfg['HtmlDir']			    = $cfg['SiteDir'].'app/data/html/';
	$cfg['ImagesDir']			= $cfg['RootDir'].'assets/images/';
	$cfg['MediaDir']			= $cfg['RootDir'].'assets/media/video/';
	
	# Session Name
	$cfg['sessName']			= 'viva';
	
	#  Udaje pre spojenie s databazou
	$cfg['dbUSER']				= 'db11751xviva';
	$cfg['dbPASS']				= 'v1vnews05dx';
	$cfg['dbNAME']				= 'db11751xviva';
	$cfg['dbADDRESS']			= 'sql6.dnsserver.eu';
	
	#  Potrebne subory pre chod stranky
	require_once($cfg['SiteDir'].'app/lib/class.mysqldb.inc');
	require_once($cfg['SiteDir'].'app/lib/class.content.inc');
	require_once($cfg['SiteDir'].'app/lib/class.sessionController.inc');
	require_once($cfg['SiteDir'].'app/lib/class.TemplateController.inc');
	require_once($cfg['SiteDir'].'app/lib/class.mysqldb.inc');
?>