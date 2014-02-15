<?php

require_once 'login.php';

//include("register_image.php");

print("start2");
// param id, x, y
if(isset($_GET['id']) && isset($_GET['x']) && isset($_GET['y']) && isset($_GET['image_file_name']) && isset($_GET['page_url'])){
  //$id=$_GET['id'];
  $x=$_GET['x'];
  $y=$_GET['y'];
  $image_file_name=$_GET['image_file_name'];
  $page_url=$_GET['page_url'];
}else if(isset($_POST['id']) && isset($_POST['x']) && isset($_POST['y']) && isset($_POST['image_file_name']) && isset($_POST['page_url'])){
  //$id=$_POST["id"];
  $x=$_POST["x"];
  $y=$_POST["y"];
  $image_file_name=$_POST["image_file_name"];
  $page_url=$_POST["page_url"];
}else{
  return;
}

$uploaddir = '/var/www/html/chocolate/img/';
    
print("test2");
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
    //  $finfo = new finfo(FILEINFO_MIME_TYPE);
    //  if (false === $ext = array_search
    //  (
    //     $finfo->file($_FILES['image']['tmp_name']),
    //       array(
    //         'jpg' => 'image/jpeg',
    //         'png' => 'image/png',
    //         'gif' => 'image/gif',
    //       ),
    //       true
    //      ))
    //    {
    //      echo 'not supported';
    //    }
    //    print("ext: " . $ext);
    
    
    // ファイル内容取得
    //   $file_handle = fopen($tmp_name, "r");
    //   $contents = "";
    //   while (!feof($file_handle)) {
    //     $line = fgets($file_handle);
    //     $contents = contents . $line . 
    //   }
    //   fclose($file_handle);
  
    //print($contents);
    //move_uploaded_file( $tmp_name, "../img/" . md5($contents) . "." . $ext ) );
    

$db_server = mysql_connect($db_hostname, $db_username, $db_password);

if (!$db_server)
{
  die("can't connect server");
}
mysql_select_db($db_database) or die("can't select database");

// insert
$sql = "INSERT INTO IMAGES (x,y,image_file_name,page_url) VALUES(" . $x . "," . $y . ",'" . $image_file_name . "','" . $page_url . "');";
print($sql);
$db_access = mysql_query($sql);
if (!$db_access)
{
  die("can't access the table");
}

mysql_close($db_access);
?>

