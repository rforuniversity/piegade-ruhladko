let route = location.search.split('?route=')[1];
$('h1').text(`Clients of route #${route}`);

let clients = [];

$.ajax({
	type: "POST",
	url: "./php/getClients.php",
	data: {
		route: window.location.search.split('?route=')[1]
	},
	dataType: "JSON",
	success: function (data) {
		document.querySelector('tbody').innerHTML = '';

		for (let i = 0; i < data.length; i++) {
			let tr = document.createElement('tr');
			let id = document.createElement('td');
			id.innerText = `#${data[i].id}`;

			let name = document.createElement('td');
			name.innerText = data[i].name;

			let address = document.createElement('td');
			address.innerText = data[i].address;

			let location = document.createElement('td');
			location.innerText = data[i].location;

			tr.append(id);
			tr.append(name);
			tr.append(address);
			tr.append(location);

			document.querySelector('tbody').append(tr);

			let option = document.createElement('option');
			option.value = data[i].id;
			option.innerText = id.innerText;

			$('select').append(option);

			clients[data[i].id] = data[i];
		}
	}
});

$('#editClient select').on('change', function () {
	showModal('#editClient');
});