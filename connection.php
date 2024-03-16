<?php
$servername='localhost';
$username='sonia';
$password='sonia';
$dbname = "LEADERBOARD";
$conn=mysqli_connect($servername,$username,$password,"$dbname");
if(!$conn){
   die('Could not Connect My Sql:' .mysql_error());
}
?>