<?php
if(!isset($_GET['page']))
{
  echo "<p>specify the page by query!</p>\n";
  exit;
}
header('Content-type: text/html; charset=UTF-8');
$file = fopen ($_GET['page'], "r");
if (!$file)
{
  echo "<p>can't open remote file.</p>\n";
  exit;
}
readfile($_GET['page']);
fclose($file);
?>
