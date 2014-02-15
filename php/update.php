<?php

require_once 'login.php';


header('Access-Control-Allow-Origin: *');
header('Content-type: text/plain; charset=UTF-8');

// param id, x, y 

/*
if(isset($_GET['id']) && isset($_GET['x']) && isset($_GET['y']) ){
  $id=$_GET['id'];
  $x=$_GET['x'];
  $y=$_GET['y'];
}else if(isset($_POST['id']) && isset($_POST['x']) && isset($_POST['y']) ){
  $id=$_POST["id"];
  $x=$_POST["x"];
  $y=$_POST["y"];
}else{
  return;
}
*/

$json=file_get_contents('php://input');
$obj = json_decode($json, true);
$id = $obj["id"];
$x = $obj["x"];
$y = $obj["y"];

$db_server = mysql_connect($db_hostname, $db_username, $db_password);

if (!$db_server)
{
  die("can't connect server");
}
mysql_select_db($db_database) or die("can't select database");

// insert
$sql = "UPDATE IMAGES set x=" . $x . " , y=" . $y . " WHERE id = " .  $id . ";";
$db_access = mysql_query($sql);
if (!$db_access)
{
  die("can't access the table");
}
mysql_close($db_access);

echo 'done';
?>
