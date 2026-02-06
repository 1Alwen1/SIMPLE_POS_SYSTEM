<?php
header('Content-Type: application/json');
require 'db.php';

$result = $conn->query("SELECT * FROM transactions ORDER BY date_time DESC");
$history = [];
while($row = $result->fetch_assoc()) {
    $history[] = $row;
}

echo json_encode($history);
?>
