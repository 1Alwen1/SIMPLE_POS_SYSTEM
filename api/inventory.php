<?php
header('Content-Type: application/json');
require 'db.php';

$method = $_SERVER['REQUEST_METHOD'];

if ($method == 'GET') {
    // Get all items
    $result = $conn->query("SELECT * FROM inventory");
    $items = [];
    while($row = $result->fetch_assoc()) {
        $items[] = $row;
    }
    echo json_encode($items);
}

if ($method == 'POST') {
    // Add new item
    $data = json_decode(file_get_contents('php://input'), true);
    $name = $conn->real_escape_string($data['name']);
    $category = $conn->real_escape_string($data['category']);
    $price = floatval($data['price']);
    
    $conn->query("INSERT INTO inventory (name, category, price) VALUES ('$name', '$category', $price)");
    echo json_encode(["success" => true]);
}

if ($method == 'DELETE') {
    // Remove item
    $id = intval($_GET['id']);
    $conn->query("DELETE FROM inventory WHERE id=$id");
    echo json_encode(["success" => true]);
}
?>
