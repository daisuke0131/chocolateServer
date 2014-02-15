<?php

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

    echo $name . ' - ' $tmp_name;

    move_uploaded_file( $tmp_name, "../img/" . md5($name) );
  }

?>
