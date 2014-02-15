<?php

//$link = mysql_connect('localhost', 'testuser', 'testuser');
$link = mysql_connect('59.106.190.48', 'testuser', 'testuser');

$db_selected = mysql_select_db('uriage', $link);


mysql_set_charset('utf8');

$result = mysql_query('SELECT id,name FROM shouhin');

$rWord="";
while ($row = mysql_fetch_assoc($result)) {
    //print('id='.$row['id']);
    //print(',name='.$row['name']);
    $rWord =  $rWord . 'id=' .$row['id']; 
}

$close_flag = mysql_close($link);



?>
