<?php

$uploaddir = '/var/www/html/chocolate/img/';
//$uploadfile = $uploaddir . basename($_FILES['userfile']['name']);

echo '<pre>';

/*

$filename = md5($_FILES['userfile'];

if (move_uploaded_file($_FILES['userfile']['tmp_name'], $uploadfile)) {
    echo "File is valid, and was successfully uploaded.\n";
} else {
    echo "Possible file upload attack!\n";
}

echo 'Here is some more debugging info:';
print_r($_FILES);

print "</pre>";
*/
if ($_FILES["file"]["error"] > 0)
  {
  echo "Error: " . $_FILES["file"]["error"] . "<br>";
  }
else
  {
  echo "Upload: " . $_FILES["userfile"]["name"] . "<br>";
  echo "Type: " . $_FILES["userfile"]["type"] . "<br>";
  echo "Size: " . ($_FILES["userfile"]["size"] / 1024) . " kB<br>";
  echo "Stored in: " . $_FILES["userfile"]["tmp_name"];
  }

?>
