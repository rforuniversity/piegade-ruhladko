<?php
	require 'config.php';

	$conn = mysqli_connect($servername, $username, $password, $database);

	if (!$conn) {
    	die("Connection failed: " . mysqli_connect_error());
    }

	$id = $_POST['id'];

	$result = mysqli_query($conn, "DELETE FROM routes WHERE id = '$id'");
	if ($result){
		echo json_encode(true);
	}
	else{
		echo "Error: " . $sql . "<br>" . mysqli_error($conn);
	}
