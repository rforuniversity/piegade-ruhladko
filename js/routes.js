let routes = [];

$.ajax({
	type: "POST",
	url: "./php/getRoutes.php",
	dataType: "JSON",
	success: function (data) {
		document.querySelector('tbody').innerHTML = '';

		for (let i = 0; i < data.length; i++) {
			let tr = document.createElement('tr');
			let id = document.createElement('td');
			id.innerText = `#${data[i].id}`;

			let clients = document.createElement('td');
			clients.innerHTML = `<div class="btn" onclick="openClients(${data[i].id})">Clients</div>`;

			let date = document.createElement('td');
			date.innerText = data[i].date;

			let map = document.createElement('td');
			map.innerHTML = `<div class="btn" onclick="map(${data[i].id})">Map</div>`

			tr.append(id);
			tr.append(date);
			tr.append(clients);
			tr.append(map);

			document.querySelector('tbody').append(tr);

			let option = document.createElement('option');
			option.innerText = id.innerText;
			option.value = data[i].id;

			$('select').append(option);

			routes[data[i].id] = data[i];
		}
	}
});

$('#editRoute select').on('change', function () {
	showModal('#editRoute');
});