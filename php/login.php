<?php
	require 'config.php';

	$conn = mysqli_connect($servername, $username, $password, $database);

	if (!$conn) {
    	die("Connection failed: " . mysqli_connect_error());
    }

	$login = $_POST['login'];
	$pass = $_POST['pass'];

	if ($login == '' || $pass == ''){
		die(false);
	}

	$result = mysqli_query($conn, "SELECT * FROM users WHERE login = '$login'");
	if ($result){
		$data = mysqli_fetch_assoc($result);
		
		if ($data['password'] == $pass){
			echo json_encode(true);
		}
		else{
			echo json_encode(false);
		}
		
	}
	else{
		echo "Error: " . $sql . "<br>" . mysqli_error($conn);
	}
