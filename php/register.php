<?php
	require 'config.php';

	$conn = mysqli_connect($servername, $username, $password, $database);

	if (!$conn) {
    	die("Connection failed: " . mysqli_connect_error());
    }

	$login = $_POST['login'];
	$pass = $_POST['pass'];

	$result = mysqli_query($conn, "SELECT * FROM users WHERE login = '$login'");
	if ($result){
		$data = mysqli_fetch_assoc($result);
		
		if ($data['login'] == $login){
			echo json_encode(false);
		}
		else{
			$result = mysqli_query($conn, "INSERT INTO users (login, password) VALUES ('$login', '$pass')");
			if ($result){
				echo json_encode(true);
			}
			else{
				echo "Error: " . $sql . "<br>" . mysqli_error($conn);
			}
		}
		
	}
	else{
		echo "Error: " . $sql . "<br>" . mysqli_error($conn);
	}
