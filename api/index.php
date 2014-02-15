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

$sql_string = 'SELECT id,x,y,image_file_name FROM IMAGES WHERE page_url = \'' . $page_url . '\'';

$db_access = mysql_query($sql_string);

if (!$db_access)
{
  die("can't access the table");
}
header('Access-Control-Allow-Origin: *');
header('Content-type: application/json; charset=UTF-8');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

$result = array();
$result['data'] = array();

while ($res = mysql_fetch_object($db_access))
{
  $result['data'][] = $res;
}

echo json_encode($result);

mysql_close();
?>


