<?php
	require 'config.php';

	$conn = mysqli_connect($servername, $username, $password, $database);

	if (!$conn) {
    	die("Connection failed: " . mysqli_connect_error());
    }

	$name = $_POST['name'];
	$address = $_POST['address'];
	$location = $_POST['location'];
	$route = $_POST['route'];

	if ($name == '' || $address == '' || $location == '' || $route == ''){
		die('Error');
	}

	$result = mysqli_query($conn, "INSERT INTO clients (name, address, location, route) VALUES ('$name', '$address', '$location', '$route')");
	if ($result){
		echo json_encode(true);
	}
	else{
		echo "Error: " . $sql . "<br>" . mysqli_error($conn);
	}
