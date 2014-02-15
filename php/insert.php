<?php

require_once 'login.php';

//include("register_image.php");
header('Access-Control-Allow-Origin: *');
header('Content-type: application/json; charset=UTF-8');


// param id, x, y
if( isset($_GET['url'])){
  $page_url=$_GET['form_url'];
}else if( isset($_POST['url'])){
  $page_url=$_POST["url"];
}else{
  print(" no palameter!");
  return;
}

$uploaddir = '/var/www/html/chocolate/img/';
    
if ($_FILES["image"]["error"] > 0)
{
    echo "Error: " . $_FILES["image"]["error"] . "<br>";
}
else
{
    echo "Upload: " . $_FILES["image"]["name"] . "<br>";
    echo "Type: " . $_FILES["image"]["type"] . "<br>";
    echo "Size: " . ($_FILES["image"]["size"] / 1024) . " kB<br>";
    echo "Stored in: " . $_FILES["image"]["tmp_name"];
        
    $tmp_name = $_FILES["image"]["tmp_name"];
    $name     = $_FILES["image"]["name"];
    echo "tmp_name:" . $tmp_name;
    echo "name    :" . $name;
}

//拡張子取得
$finfo = new finfo(FILEINFO_MIME_TYPE);
if (false === $ext = array_search
(
  $finfo->file($_FILES['image']['tmp_name']),
  array(
    'jpg' => 'image/jpeg',
    'png' => 'image/png',
    'gif' => 'image/gif',
  ),
 true
))
{
  echo 'not supported';
  
  return;
}
    
    
// ファイル内容取得
//$file_handle = fopen($tmp_name, "r");
//$contents = "";
//while (!feof($file_handle)) {
//  $line = fgets($file_handle);
//  $contents = contents . $line . 
//}
//fclose($file_handle);

$image_file_name=md5_file($tmp_name) . "." .$ext;
move_uploaded_file( $tmp_name, "../img/" . $image_file_name );

// INSERT    
$db_server = mysql_connect($db_hostname, $db_username, $db_password);

if (!$db_server)
{
  die("can't connect server");
}
mysql_select_db($db_database) or die("can't select database");

// insert
$sql = "INSERT INTO IMAGES (x,y,image_file_name,page_url) VALUES(0,0,'" . $image_file_name . "','" . $page_url . "');";
$db_access = mysql_query($sql);
if (!$db_access)
{
  die("can't access the table");
}

$sql = "SELECT max(id) FROM IMAGES";
$db_access = mysql_query($sql);
if (!$db_access)
{
  die("can't access the table");
}


$result = array();
$result['id'] = array();

mysql_close($db_access);
echo json_encode($result);
?>

