<?php
	require 'config.php';

	$conn = mysqli_connect($servername, $username, $password, $database);

	if (!$conn) {
    	die("Connection failed: " . mysqli_connect_error());
    }

	$date = $_POST['date'];

	if ($date == ''){
		die('Error');
	}

	$result = mysqli_query($conn, "INSERT INTO routes (date) VALUE ('$date')");
	if ($result){
		echo json_encode(true);
	}
	else{
		echo "Error: " . $sql . "<br>" . mysqli_error($conn);
	}
