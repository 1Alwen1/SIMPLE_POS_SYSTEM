<?php
header('Content-Type: application/json');
require 'db.php';

$data = json_decode(file_get_contents('php://input'), true);

$items = $conn->real_escape_string($data['items']);
$total = floatval($data['total']);
$payment = floatval($data['payment']);
$change = floatval($data['change']);

$conn->query("INSERT INTO transactions (items, total, payment, change_amount) 
             VALUES ('$items', $total, $payment, $change)");

echo json_encode(["success" => true]);
?>
