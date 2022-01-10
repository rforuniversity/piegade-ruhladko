function getData() {
	$.getJSON("./php/getData.php",
		function (data, textStatus, jqXHR) {
			console.log(data);
		}
	);
}

function login() {
	let login = document.querySelector('input[name=login]').value;
	let pass = document.querySelector('input[name=password]').value;

	$.ajax({
		type: "POST",
		url: "./php/login.php",
		data: {
			login: login,
			pass: pass
		},
		dataType: "JSON",
		success: function (data) {
			if (data) {
				location.href = 'routes.html';
			}
		}
	});
}

function openClients(val) {
	location.href = 'clients.html?route=' + val;
}

function showModal(val) {
	$('#modal').fadeIn(200).css('display', 'flex');
	$('.box').css('display', 'none');
	$(val).css('display', 'flex');

	if (val == '#editRoute') {
		let id = +$('#editRoute select option:selected').val();
		$('#editRoute input').val(routes[id].date);
	}
	else if (val == '#editClient') {
		let id = +$('#editClient select option:selected').val();
		$('#editClient input[name=editName').val(clients[id].name);
		$('#editClient input[name=editAddress]').val(clients[id].address);
		$('#editClient input[name=editLocation]').val(clients[id].location);
	}
}

function addClient() {
	let name = $('input[name=name]').val();
	let address = $('input[name=address]').val();
	let location = $('input[name=location]').val();
	let route = window.location.search.split('?route=')[1];

	$.ajax({
		type: "POST",
		url: "./php/addClient.php",
		data: {
			name: name,
			address: address,
			location: location,
			route: route
		},
		dataType: "JSON",
		success: function (data) {
			window.location.reload()
		}
	});

	$('#modal').fadeOut(200).css('display', 'flex');
}

function editClient() {
	let id = $('#editClient select option:selected').val();
	let name = $('input[name=editName]').val();
	let address = $('input[name=editAddress]').val();
	let location = $('input[name=editLocation]').val();
	let route = window.location.search.split('?route=')[1];

	$.ajax({
		type: "POST",
		url: "./php/editClient.php",
		data: {
			id: id,
			name: name,
			address: address,
			location: location,
			route: route
		},
		dataType: "JSON",
		success: function (data) {
			window.location.reload()
		}
	});

	$('#modal').fadeOut(200).css('display', 'flex');
}

function deleteClient() {
	let id = $('select option:selected').val();

	$.ajax({
		type: "POST",
		url: "./php/deleteClient.php",
		data: {
			id: id
		},
		dataType: "JSON",
		success: function (data) {
			window.location.reload()
		}
	});

	$('#modal').fadeOut(200).css('display', 'flex');
}

function map(val) {
	$.ajax({
		type: "POST",
		url: "./php/getClients.php",
		data: {
			route: val
		},
		dataType: "JSON",
		success: function (data) {
			let waypoints = [];

			waypoints.push([24.114295874791676, 56.99270251479398]);
			for (let i = 0; i < data.length; i++) {
				waypoints.push([+data[i].location.split(' ')[1], +data[i].location.split(' ')[0]]);
			}
			waypoints.push([24.114295874791676, 56.99270251479398]);

			localStorage.setItem('map', JSON.stringify(waypoints));
			window.open('map.html');
		}
	});
}

function addRoute() {
	let date = $('input[name=date]').val();

	$.ajax({
		type: "POST",
		url: "./php/addRoute.php",
		data: {
			date: date
		},
		dataType: "JSON",
		success: function (data) {
			console.log(data);
			window.location.reload()
		}
	});

	$('#modal').fadeOut(200).css('display', 'flex');
}

function editRoute() {
	let id = $('#editRoute select option:selected').val();
	let date = $('#editRoute input').val();

	$.ajax({
		type: "POST",
		url: "./php/EditRoute.php",
		data: {
			id: id,
			date: date
		},
		dataType: "JSON",
		success: function (data) {
			console.log(data);
			window.location.reload()
		}
	});

	$('#modal').fadeOut(200).css('display', 'flex');
}

function deleteRoute() {
	let id = $('select option:selected').val();

	$.ajax({
		type: "POST",
		url: "./php/deleteRoute.php",
		data: {
			id: id
		},
		dataType: "JSON",
		success: function (data) {
			window.location.reload()
		}
	});

	$('#modal').fadeOut(200).css('display', 'flex');
}

function register() {
	let login = document.querySelector('input[name=login]').value;
	let pass = document.querySelector('input[name=password]').value;

	$.ajax({
		type: "POST",
		url: "./php/register.php",
		data: {
			login: login,
			pass: pass
		},
		dataType: "JSON",
		success: function (data) {
			if (data) {
				location.href = 'index.html';
			}
		}
	});
}

$(document).keydown(function (e) {
	if (e.keyCode == 27) {
		$('#modal').fadeOut(200);

		$('#addClient').fadeOut(200);
		$('#editClient').fadeOut(200);
		$('#deleteClient').fadeOut(200);

		$('#addRoute').fadeOut(200);
		$('#editRoute').fadeOut(200);
		$('#deleteRoute').fadeOut(200);
	}
});