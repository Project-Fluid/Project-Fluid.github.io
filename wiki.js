// Functions
var getJSON = function(url, callback) {
	var xhr = new XMLHttpRequest();
	xhr.open('GET', url, true);
	xhr.responseType = 'json';
	xhr.onload = function() {
		var status = xhr.status;
		if (status === 200) {
		callback(null, xhr.response);
		} else {
		callback(status, xhr.response);
		}
	};
	xhr.send();
};

getJSON('https://raw.githubusercontent.com/Project-Fluid-Devices/official_devices/master/core.json', function(err, data) {
	if (err !== null) {
		alert('Error parsing devs list\nError ' + err + '\nCheck your Internet connection and retry later, if that still persist, please contact Fluid team');
	} else {
		var devListHTML = '<div class="profiles">'
		for (dev in data) {
			devListHTML += '' +
				'<div>' +
					'<img src="https://github.com/' + data[dev].github_username + '.png" /><br><br>' +
					'<span>' + data[dev].name + '</span><br>' +
					data[dev].github_username + '<br>' +
					data[dev].role +
				'</div>' +
			'';
		}
		devListHTML += '</div>'
		document.getElementById("team").innerHTML = devListHTML
	}
});