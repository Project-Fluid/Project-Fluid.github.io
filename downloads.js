// Global variables
var previousDevice
var devicesData

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


getJSON('https://raw.githubusercontent.com/Project-Fluid-Devices/official_devices/master/devices.json', function(err, data) {
	if (err !== null) {
		alert('Error parsing devices list\nError ' + err + '\nCheck your Internet connection and retry later, if that still persist, please contact Fluid team');
	} else {
		devicesData = data
		var devicesListID = document.getElementById("device-list");
		var devicesList = Object.keys( data ); // Get all device codenames
		devicesList.forEach( function ( deviceCodename ) {
		var deviceInfo = data[ deviceCodename ]; // Get device specific infos
		var devicesListdiv = document.createElement("div");
		devicesListdiv.innerHTML = '<div class="device-name" id="' + deviceInfo.name + '" onclick="downloadDisp(' + "'" + deviceCodename + "'" + ')">' +
										'<h1>' + deviceInfo.name + '</h1>' +
										'<h2>' + deviceCodename + '</h2>' +
									'</div>';
		devicesListID.appendChild(devicesListdiv);
		});
	}
});

function downloadDisp( device ) {
	var devicesDownloadsID = document.getElementById("download-list") // Device downloads list element
	var deviceInfo = devicesData[ device ]; // Get device specific infos
	var deviceSupportedVersions = deviceInfo.supported_versions // Get all device supported variants, also if it's dropped or not
	var deviceSupportedVersionsList = Object.keys( deviceSupportedVersions ); // Get all device supported variants, as a list

	deviceSupportedVersionsList.forEach( function ( version ) {
		getJSON('https://raw.githubusercontent.com/Project-Fluid-Devices/official_devices/master/' + device + '/' + version + '.json', function(err, data) {
			if (err !== null) {
				alert('Error parsing version "' + version + '" of device "' + device + '"\nError ' + err + '\nCheck your Internet connection and retry later, if that still persist, please contact Fluid team');
			} else {
				devicesDownloadsID.innerHTML = '' + 
				'<div class="download-card" id="download-selection">' +
					'<div class="' + device + '">' +
						'<h1 class="deviceinfo-name">' + deviceInfo.name + '</h1>' +
						'<h1>' + device + '</h1>' +
						'<div class="card" id="' + version +'">' +
							'<div class="collapsible"><div class="version"><span>' + version + '</span></div></div>' +
								'<div class="content">' +
									'<ul>' +
										'<li>' +
											'<div class="list-items">' +
												'<svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">' +
													'<path d="M15 16.6666H11.6667V20H15V16.6666ZM21.6667 16.6666H18.3333V20H21.6667V16.6666ZM28.3333 16.6666H25V20H28.3333V16.6666ZM31.6667 4.99996H30V1.66663H26.6667V4.99996H13.3333V1.66663H10V4.99996H8.33333C6.48333 4.99996 5 6.49996 5 8.33329V31.6666C5 32.5507 5.35119 33.3985 5.97631 34.0236C6.60143 34.6488 7.44928 35 8.33333 35H31.6667C32.5507 35 33.3986 34.6488 34.0237 34.0236C34.6488 33.3985 35 32.5507 35 31.6666V8.33329C35 7.44924 34.6488 6.60139 34.0237 5.97627C33.3986 5.35115 32.5507 4.99996 31.6667 4.99996ZM31.6667 31.6666H8.33333V13.3333H31.6667V31.6666Z" fill="white"/>' +
												'</svg>' +
												'<span>' + data.datetime + '</span>' +
											'</div>' +
										'</li>' +
										'<li>' +
											'<div class="list-items">' +
												'<svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">' +
													'<path d="M20 6.66663C21.7681 6.66663 23.4638 7.369 24.714 8.61925C25.9643 9.86949 26.6667 11.5652 26.6667 13.3333C26.6667 15.1014 25.9643 16.7971 24.714 18.0473C23.4638 19.2976 21.7681 20 20 20C18.2319 20 16.5362 19.2976 15.286 18.0473C14.0357 16.7971 13.3333 15.1014 13.3333 13.3333C13.3333 11.5652 14.0357 9.86949 15.286 8.61925C16.5362 7.369 18.2319 6.66663 20 6.66663V6.66663ZM20 9.99996C19.1159 9.99996 18.2681 10.3511 17.643 10.9763C17.0179 11.6014 16.6667 12.4492 16.6667 13.3333C16.6667 14.2173 17.0179 15.0652 17.643 15.6903C18.2681 16.3154 19.1159 16.6666 20 16.6666C20.8841 16.6666 21.7319 16.3154 22.357 15.6903C22.9821 15.0652 23.3333 14.2173 23.3333 13.3333C23.3333 12.4492 22.9821 11.6014 22.357 10.9763C21.7319 10.3511 20.8841 9.99996 20 9.99996V9.99996ZM20 21.6666C24.45 21.6666 33.3333 23.8833 33.3333 28.3333V33.3333H6.66667V28.3333C6.66667 23.8833 15.55 21.6666 20 21.6666ZM20 24.8333C15.05 24.8333 9.83333 27.2666 9.83333 28.3333V30.1666H30.1667V28.3333C30.1667 27.2666 24.95 24.8333 20 24.8333Z" fill="white"/>' +
												'</svg>' +                                               
												'<span>' + deviceInfo.maintainer.name + ' (' + deviceInfo.maintainer.github_username + ')' + '</span>' +
											'</div>' +
										'</li>' +
										'<li>' +
											'<div class="list-items">' +
												'<svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">' +
													'<path d="M24.3333 27.6667L32 20L24.3333 12.3333L26.6667 10L36.6667 20L26.6667 30L24.3333 27.6667ZM15.6667 27.6667L8 20L15.6667 12.3333L13.3333 10L3.33333 20L13.3333 30L15.6667 27.6667Z" fill="white"/>' +
												'</svg>' +
												'<span>' + data.sha1sum + ' (sha1)</span>' +
											'</div>' +
										'</li>' +
										'<li>' +
											'<div class="list-items">' +
												'<svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">' +
													'<path d="M21.6667 8.33333V18.3333H23.6167L20 21.95L16.3833 18.3333H18.3333V8.33333H21.6667ZM25 5H15V15H8.33333L20 26.6667L31.6667 15H25V5ZM31.6667 30H8.33333V33.3333H31.6667V30Z" fill="white"/>' +
												'</svg>' +
												'<span><a href="' + data.url + '">Download<span> - ' + data.filename + '</span></a></span>' +
											'</div>' +
										'</li>' +
									'</ul>' +
								'</div>' +
							'</div>' +
						'</div>' +
					'</div>' +
				'</div>' +
				'';

				var coll = document.getElementsByClassName("collapsible");
				var i;

				for (i = 0; i < coll.length; i++) {
					coll[i].addEventListener("click", function() {
						this.classList.toggle("active");
						var content = this.nextElementSibling;
						if (content.style.maxHeight) {
							content.style.maxHeight = null;
						} else {
							content.style.maxHeight = content.scrollHeight + "px";
						}
					});
				}
			}
		});
	});

	var parent = document.getElementById('download-list');
	if (parent.style.display = "flex"){
		parent.style.display = "block";
	}
}
