<?php

require_once 'login.php';
// param id, x, yi
$page_url = '';
if (isset($_GET['page_url']))
{
  $page_url=$_GET['page_url'];
}
else
{
  if (isset($_POST['page_url']))
  {
    $page_url=$_POST['page_url'];
  }
  else
  {
    return;
  }
}

$db_server = mysql_connect($db_hostname, $db_username, $db_password);

if (!$db_server)
{
  die("can't connect server");
}

mysql_select_db($db_database) or die("can't select database");

if($_SERVER["REQUEST_METHOD"] == "GET"){

$sql_string = 'SELECT id,x,y,image_file_name FROM IMAGES WHERE page_url = \'' . $page_url . '\'';

$db_access = mysql_query($sql_string);

if (!$db_access)
{
  die("can't access the table");
}

$result = array();
$result['data'] = array();

while ($res = mysql_fetch_object($db_access))
{
  $result['data'][] = $res;
}

header('Access-Control-Allow-Origin: *');
header('Content-type: application/json; charset=UTF-8');
echo json_encode($result);

}elseif($_SERVER["REQUEST_METHOD"] == "OPTIONS"){
  print("options start");
  header('Access-Control-Allow-Origin: *');
  header("Access-Control-Allow-Headers: Content-Type");
  header('Content-type: text/html; charset=UTF-8');
}elseif($_SERVER["REQUEST_METHOD"] == "POST"){
  print("post start");
  //$json=$_POST["data"];
  $json=file_get_contents('php://input');
    print($json);
  $obj = json_decode($json, true);
  $id = $obj["id"];
  $x = $obj["x"];
  $y = $obj["y"];

  print("post 2");
  //$sql = sprintf("UPDATE IMAGES SET x = %s ,y =%s WHERE page_url = %s,id=%s", $obj ["x"],$obj ["y"] ,$obj ["page_url"],$obj ["id"] );
  $sql = "UPDATE IMAGES set x=" . $x . " , y=" . $y . " WHERE id = " .  $id . ";";
  $db_access = mysql_query($sql);
  if (!$db_access)
  {
    die("can't access the table");
  }

print("post 3");
$result = array();
$result['ret'] = "ok";

header('Access-Control-Allow-Origin: http://localhost');
header("Access-Control-Allow-Headers: *");
header('Content-type: application/json; charset=UTF-8');
echo json_encode($result);
}else{

}

header("Access-Control-Allow-Methods: PUT,DELETE,POST,GET,OPTIONS");


mysql_close();
?>


