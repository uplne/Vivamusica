<?php
require_once("/www/v/i/u11751/public_html/app/inc/config.inc");

global $cfg;

$DB = new mysqlDB();
$DB->dbConnect();

$name    = $_POST['name'];
$email   = $_POST['email'];
$tricko  = $_POST['tricko'];
$motiv   = $_POST['motiv'];
$velkost = $_POST['velkost'];
$pocet   = $_POST['pocet'];

$sql_query = "INSERT INTO reservations (name,email,tricko,motiv,velkost,pocet) VALUES ('".sqls($name)."','".sqls($email)."',".sqls($tricko).",".sqls($motiv).",'".sqls($velkost)."',".sqls($pocet).")";

function sqls($string){
	return mysql_escape_string($string);
}

$from = 'noreply@vivamusica.sk';

if ($DB->dbQuery($sql_query) > 0) {
	$subject = 'Vivamusica! festival | Rezervácia trička';
	$subject = "=?UTF-8?B?".base64_encode($subject)."?=\n";
	
	$headers = 'MIME-Version: 1.0'."\n";
    $headers .= 'Content-type: text/html; charset=utf-8'."\n";
	$headers .= 'From: '. $from ."\n";
    $headers .= 'Reply-To: '. $from ."\n";
    $headers .= 'Return-Path: '. $from ."\n";

	$message = '
	<!DOCTYPE html">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
</head>

<body>
<table width="600" cellpadding="0" cellspacing="0" bgcolor="#FFFFFF" border="0">
	<tr>
    	<td height="29" valign="top"><p style="padding:0;margin:0;font-family:Arial, Helvetica, sans-serif;font-size:12px;color:#000;">Milý Viva Musica! fanúšik,</p></td>
    </tr>
    <tr>
    	<td height="28" valign="top"><p style="padding:0;margin:0;font-family:Arial, Helvetica, sans-serif;font-size:12px;color:#000;">ďakujeme za záujem o tričko Viva Musica! v špeciálnej "2012" edícii.</p></td>
    </tr>
    <tr>
    	<td height="43" valign="top"><p style="padding:0;margin:0;font-family:Arial, Helvetica, sans-serif;font-size:12px;color:#000;">Tričko podľa Tvojho výberu si môžeš zakúpiť v rámci festivalového týždňa, t. j. od
23. do 30. júna 2012 osobne na VIVA MUSICA! INFO DESK-u v mieste konania
koncertu.</p></td>
    </tr>
    <tr>
    	<td height="42" valign="top"><p style="padding:0;margin:0;font-family:Arial, Helvetica, sans-serif;font-size:12px;color:#000;">Vopred rezervované tričko je potrebné vyzdvihnúť si do 25. júna, najneskôr do 20:00
hod.. Tričká, ktoré dovtedy nebudú vyzdvihnuté, budú vrátené naspäť do predaja.</p></td>
    </tr>
    <tr>
    	<td height="29" valign="top"><p style="padding:0;margin:0;font-family:Arial, Helvetica, sans-serif;font-size:12px;color:#000;">Cena trička je 10,- EUR.</p></td>
    </tr>
    <tr>
    	<td height="29" valign="top"><p style="padding:0;margin:0;font-family:Arial, Helvetica, sans-serif;font-size:12px;color:#000;">Všetky tričká sú biele s čiernou potlačou.</p></td>
    </tr>
    <tr>
    	<td height="46" valign="top"><p style="padding:0;margin:0;font-family:Arial, Helvetica, sans-serif;font-size:12px;color:#000;">Rezervácia trička prostredníctvom formuláru na našej stránke je nezáväzná a jeho
vyplnením Ťa nezaväzujeme ku kúpe trička.</p></td>
    </tr>
    <tr>
    	<td height="31" valign="top"><p style="padding:0;margin:0;font-family:Arial, Helvetica, sans-serif;font-size:12px;color:#000;">Pre viac informácií kontaktuj, prosím, manažment Viva Musica! festivalu.</p></td>
    </tr>
    <tr>
    	<td height="30" valign="top"><p style="padding:0;margin:0;font-family:Arial, Helvetica, sans-serif;font-size:12px;color:#000;">Ďakujeme a prajeme pekný deň!</p></td>
    </tr>
    <tr>
    	<td height="33" valign="top"><p style="padding:0;margin:0;font-family:Arial, Helvetica, sans-serif;font-size:12px;color:#000;">S pozdravom,</p></td>
    </tr>
    <tr>
    	<td valign="top"><p style="padding:0;margin:0;font-family:Arial, Helvetica, sans-serif;font-size:12px;color:#000;">Viva Musica! team</p></td>
    </tr>
    <tr>
    	<td height="157" valign="top"><img src="http://www.vivamusica.sk/assets/images/logoemail.jpg" width="169" height="118" alt="" style="border:0;display:block;" /></td>
    </tr>
  </table>
</body>
</html>
	';
	
	mail($email,$subject,$message,$headers);	
	
	echo 1;
} else {
	echo 0;
}

?>