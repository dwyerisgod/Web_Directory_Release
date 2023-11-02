<?php
if (isset($_GET['table'])) {
    $tableName = $_GET['table'];
    $conn = new PDO("mysql:host=keem.com.ua;dbname=monitoring_systems", "SysMonitor", "SysMonitoR2023");
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $stmt = $conn->prepare("SELECT * FROM " . $tableName);
    $stmt->execute();
    $data = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($data);
} else {
    echo json_encode([]);
}
?>
