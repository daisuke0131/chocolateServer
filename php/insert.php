<?php

require_once 'login.php';

print("start");
// param id, x, y
if(isset($_GET['id']) && isset($_GET['x']) && isset($_GET['y']) && isset($_GET['image_file_name']) && isset($_GET['page_url'])){
  $id=$_GET['id'];
  $x=$_GET['x'];
  $y=$_GET['y'];
  $image_file_name=$_GET['image_file_name'];
  $page_url=$_GET['page_url'];
}else if(isset($_POST['id']) && isset($_POST['x']) && isset($_POST['y']) && isset($_POST['image_file_name']) && isset($_POST['page_url'])){
  $id=$_POST["id"];
  $x=$_POST["x"];
  $y=$_POST["y"];
  $image_file_name=$_POST["image_file_name"];
  $page_url=$_POST["page_url"];
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
$sql = "INSERT INTO IMAGES (id,x,y,image_file_name,page_url) VALUES(" . $id . "," . $x . "," . $y . ",'" . $image_file_name . "','" . $page_url . "');";
print($sql);
$db_access = mysql_query($sql);
if (!$db_access)
{
  die("can't access the table");
}

mysql_close($db_access);
?>

