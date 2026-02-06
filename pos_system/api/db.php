<?php
$host = "localhost";
$user = "root";       // default XAMPP user
$pass = "";           // default XAMPP password is empty
$db   = "simple_pos_db";

$conn = new mysqli($host, $user, $pass, $db);

if ($conn->connect_error) {
    die(json_encode(["error" => "Connection failed: " . $conn->connect_error]));
}
?>
