<?php
	require 'config.php';

	$conn = mysqli_connect($servername, $username, $password, $database);

	if (!$conn) {
    	die("Connection failed: " . mysqli_connect_error());
    }

	$result = mysqli_query($conn, "SELECT * FROM routes");
	if ($result){
		$data = array();
		while ($row = mysqli_fetch_assoc($result)){
			$data[] = $row;
		}
		echo json_encode($data);
	}
	else{
		echo "Error: " . $sql . "<br>" . mysqli_error($conn);
	}
