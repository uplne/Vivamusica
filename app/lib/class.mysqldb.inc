<?php

class mysqlDB
{		
	function __construct()
	{
		global $cfg;
	
		$this->dbUSER			= $cfg['dbUSER'];
		$this->dbPASS			= $cfg['dbPASS'];
		$this->dbNAME			= $cfg['dbNAME'];
		$this->dbHOST			= $cfg['dbADDRESS'];
	}
		
	function dbConnect()
	{	
		$connect = mysql_connect($this->dbHOST,$this->dbUSER,$this->dbPASS);
		if(!$connect) die('Error: database connection failed');
		else 
		{
			$select_db = mysql_select_db($this->dbNAME);
			if(!$select_db) die('Chyba s databázou');
			else return $connect;
		}
	}
	
	# ---------------------------------------------------------------------------------------------
	
	function dbDisconnect($connect)
	{
		mysql_close($connect);
	}
	
	# ---------------------------------------------------------------------------------------------
	
	function Error($errno)
	{
		echo 'ERROR '.$errno;
		exit;
	}
	
	# ---------------------------------------------------------------------------------------------
	
	function dbQuery($sql_query)
	{
		@mysql_query("SET NAMES utf8");
		$sql = mysql_query($sql_query);
		if(!$sql) $this->Error(2);
		else return $sql;
	}
	# ---------------------------------------------------------------------------------------------
	
	function dbSelectOne($sql_query)
	{
		$obj = false;
		
		if($sql = $this->dbQuery($sql_query))
		{
			if($this->dbNumRows($sql) != 0) $obj = mysql_fetch_assoc($sql);
		}
		
		return $obj;
	}
	
	# ---------------------------------------------------------------------------------------------

	function dbSelectAll($sql_query)
	{		
		if($sql = $this->dbQuery($sql_query))
		{
			if($this->dbNumRows($sql) != 0)
			{
				$rows = array();
				
				while($row = mysql_fetch_assoc($sql)){
					array_push($rows, $row);
				}
			}
		}
		mysql_close();
		return $rows;
	}
	
	# ---------------------------------------------------------------------------------------------
	
	function dbNumRows($sql_query)
	{
		if(!empty($sql_query)) return mysql_num_rows($sql_query);	
	}
	
	function dbFieldName($sql_query,$pos)
	{
		if(!empty($sql_query)) return mysql_field_name($sql_query,$pos);
	}
	
	function dbLastInsertId()
	{
		return mysql_insert_id();
	}
}

?>