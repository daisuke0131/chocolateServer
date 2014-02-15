<?php

require_once 'login.php';

print("start");
// param id, x, y 
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

$db_server = mysql_connect($db_hostname, $db_username, $db_password);

if (!$db_server)
{
  die("can't connect server");
}
mysql_select_db($db_database) or die("can't select database");

// insert
$sql = "UPDATE IMAGES set x=" . $x . " , y=" . $y . " WHERE id = " .  $id . ";";
print($sql);
$db_access = mysql_query($sql);
if (!$db_access)
{
  die("can't access the table");
}
mysql_close($db_access);
?>
