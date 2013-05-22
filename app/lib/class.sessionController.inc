<?php

class SessionController
{	
	function __construct(){
	}
	
	function createSession(){
		session_start();
	}
	
	function setLanguage($language){
		$_SESSION['language'] = $language;
	}
	function getLanguage(){
		return $_SESSION['language'];
	}
}
?>