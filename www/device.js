document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
	console.log("device is ready");
	
	window.geofence.initialize().then(function () {
        console.log("Geofence initialization successful");
    }, function (error) {
        console.log("Error", error);
    });
	
	window.geofence.onTransitionReceived = function (geofences) {
	    geofences.forEach(function (geo) {
	        console.log('Geofence transition detected', geo);
	    });
	};
	
	window.geofence.onNotificationClicked = function (notificationData) {
	    console.log('App opened from Geofence notification!', notificationData);
	};

	
	cordova.plugins.notification.local.on("click", function(notification) {
		alert("clicked: " + notification.id);
	});
	
}

function DeviceCtrl($rootScope) {

	// Bar code
	$rootScope.scan = function(target) {
		cordova.plugins.barcodeScanner.scan(function(value) {
			$rootScope.data[target] = value.text;
		}, function(error) {
			alert('Error Occured' + error);
		});
	};

	// Location
	$rootScope.getCurrentLocation = function(lat, long, alt) {
		navigator.geolocation.getCurrentPosition(function(position) {
			$rootScope.data[lat] = //'Lat: ' + 
				position.coords.latitude;
			$rootScope.data[long] = //'Long: ' + 
				position.coords.longitude;
			$rootScope.data[alt] = //'Alt: ' + 
				position.coords.altitude;
			/*
			 * alert('Latitude: ' + position.coords.latitude + '\n' +
			 * 'Longitude: ' + position.coords.longitude + '\n' + 'Altitude: ' +
			 * position.coords.altitude + '\n' + 'Accuracy: ' +
			 * position.coords.accuracy + '\n' + 'Altitude Accuracy: ' +
			 * position.coords.altitudeAccuracy + '\n' + 'Heading: ' +
			 * position.coords.heading + '\n' + 'Speed: ' +
			 * position.coords.speed + '\n' + 'Timestamp: ' + position.timestamp +
			 * '\n');
			 */
		}, function(error) {
			alert('Error Occured' + error);
		}, {
			maximumAge : 1000,
			enableHighAccuracy : true
		});
	};

	$rootScope.watchPosition = function(lat, long, alt) {
		navigator.geolocation.watchPosition(function(position) {
			$rootScope.data[lat] = //'Lat: ' + 
				position.coords.latitude;
			$rootScope.data[long] = //'Long: ' + 
				position.coords.longitude;
			$rootScope.data[alt] = //'Alt: ' + 
				position.coords.altitude;
			$rootScope.$apply();
		}, function(error) {
			alert('Error Occured' + error);
		}, {
			maximumAge : 1000,
			enableHighAccuracy : true
		});
	};
	
	// Geo-Fence
	
	$rootScope.track = function() {

		window.geofence.addOrUpdate({
		    id:             "69ca1b88-6fbe-4e80-a4d4-ff4d3748acdb",
		    latitude:       28.4399214,
		    longitude:      77.0653404,
		    radius:         1,
		    transitionType: TransitionType.ENTER,
		    notification: {
		        id:             1,
		        title:          "Welcome",
		        text:           "You just arrived.",
		        openAppOnClick: true
		    }
		}).then(function () {
		    console.log('Geofence successfully added');
		}, function (reason) {
		    console.log('Adding geofence failed', reason);
		});
		
		window.geofence.addOrUpdate({
		    id:             "69ca1b88-6fbe-4e80-a4d4-ff4d3748acdb2",
		    latitude:       28.4399214,
		    longitude:      77.0653404,
		    radius:         1,
		    transitionType: TransitionType.EXIT,
		    notification: {
		        id:             2,
		        title:          "Bye",
		        text:           "Thanks for visiting.",
		        openAppOnClick: true
		    }
		}).then(function () {
		    console.log('Geofence successfully added');
		}, function (reason) {
		    console.log('Adding geofence failed', reason);
		});
		
	};


	// Acceleration
	$rootScope.getCurrentAcceleration = function(x, y, z) {
		navigator.accelerometer.getCurrentAcceleration(function(acceleration) {
			$rootScope.data[x] = //'X: ' + 
				acceleration.x;
			$rootScope.data[y] = //'Y: ' + 
				acceleration.y;
			$rootScope.data[z] = //'Z: ' + 
				acceleration.z;
		}, function(error) {
			alert('Error Occured' + error);
		});
	};
	
	function doubleToInt(double) {
		if(!double) {
			return 0;
		}
		double = "" + double;
		return parseInt(double.substring(0, double.indexOf('.')));
	}

	$rootScope.watchAcceleration = function(x, y, z) {

//		navigator.accelerometer.watchAcceleration(function(acceleration) {
//			$rootScope.data[x] = 'X: ' + acceleration.x;
//			$rootScope.data[y] = 'Y: ' + acceleration.y;
//			$rootScope.data[z] = 'Z: ' + acceleration.z;
//			$rootScope.$apply();
//		}, function(error) {
//			alert('Error Occured' + error);
//		}, {
//			period : 100
//		});
		
		$rootScope.data['dx'] = [];
		$rootScope.data['dy'] = [];
		$rootScope.data['dz'] = [];

		createTable('shock', 'timeOfEvent TEXT, lat TEXT, long TEXT, alpha TEXT, beta TEXT, gamma TEXT');
		
		window.addEventListener('deviceorientation', function(eventData) {

			var idle = true;

			// alpha is the compass direction the device is facing in degrees
			var dir = doubleToInt(eventData.alpha);
			var dX = $rootScope.data[x] - dir;
			$rootScope.data[x] = dir;

			if (dX > 10) {
				$rootScope.data['dx'].push(dX);
				idle = false;
			}
			
			// beta is the front-to-back tilt in degrees, where front is positive
			var tiltFB = doubleToInt(eventData.beta);
			var dY = $rootScope.data[y] - tiltFB;
			$rootScope.data[y] = tiltFB;

			if (dY > 10) {
				$rootScope.data['dy'].push(dY);
				idle = false;
			}

			// gamma is the left-to-right tilt in degrees, where right is positive
			var tiltLR = doubleToInt(eventData.gamma);
			var dZ = $rootScope.data[z] - tiltLR;
			$rootScope.data[z] = tiltLR;

			if (dZ > 10) {
				$rootScope.data['dz'].push(dZ);
				idle = false;
			}

			if(idle == false){
				$rootScope.data['idle'] = 0;
			} else {
				$rootScope.data['idle'] = $rootScope.data['idle'] + 1;
			}
						 
			if ($rootScope.data['idle'] > 25) {
				
				$rootScope.data['idle'] = 0;

				if($rootScope.data['dx'].length > 0 ||
						$rootScope.data['dy'].length > 0 ||
						$rootScope.data['dz'].length > 0 ) {
					
				saveRow("shock", { 
						"timeOfEvent"  : eventData.timeStamp, 
						"lat"   : $rootScope.data['lat'], 
						"long"  : $rootScope.data['long'], 
						"alpha" : JSON.stringify($rootScope.data['dx']),
						"beta" : JSON.stringify($rootScope.data['dy']),
						"gamma" : JSON.stringify($rootScope.data['dz'])
						});
				
				$rootScope.data['dx'] = []; // $rootScope.data['dx'].splice(5);
				$rootScope.data['dy'] = [];
				$rootScope.data['dz'] = []; 
				
				}
			}

			$rootScope.$apply();
		
		 }, false);
	};

	// Motion
	$rootScope.getCurrentHeading = function(heading) {
		navigator.accelerometer.getCurrentHeading(function(compass) {
			$rootScope.data[heading] = 'Heading: ' + compass.magneticHeading;
		}, function(error) {
			alert('Error Occured' + error);
		});
	};

	$rootScope.watchHeading = function(heading) {
		navigator.compass.watchHeading(function(compass) {
			$rootScope.data[heading] = 'Heading: ' + compass.magneticHeading;
		}, function(error) {
			alert('Error Occured' + error);
		});
	};

	// Camera
	$rootScope.capture = function(img) {
		navigator.camera.getPicture(function(imageSrc) {
			var image = document.getElementById(img);
			image.src = imageSrc;
		}, function(error) {
			alert('Error Occured' + error);
		}, {
			quality : 50,
			destinationType : Camera.DestinationType.FILE_URI
		});

	};
	
	// Auth
	
	$rootScope.login = function() {
		window.plugins.googleplus.login( {
			      'scopes': 'profile email', // optional space-separated list of scopes, the default is sufficient for login and basic profile info 
			      'offline': true, // optional, used for Android only - if set to true the plugin will also return the OAuth access token ('oauthToken' param), that can be used to sign in to some third party services that don't accept a Cross-client identity token (ex. Firebase) 
			      'webApiKey': 'api of web app', // optional API key of your Web application from Credentials settings of your project - if you set it the returned idToken will allow sign in to services like Azure Mobile Services 
			      // there is no API key for Android; you app is wired to the Google+ API by listing your package name in the google dev console and signing your apk (which you have done in chapter 4) 
			    },
			    function (obj) {
			      alert(JSON.stringify(obj)); // do something useful instead of alerting 
			    },
			    function (msg) {
			      alert('error: ' + msg);
			    }
		);
	};
	
	$rootScope.logout = function(img) {
		window.plugins.googleplus.logout(
		    function (msg) {
		      alert(msg); // do something useful instead of alerting 
		    }
		);
	};
	
	// Social
	
	$rootScope.share = function(text) {
		var _data = data();
		var receiver = _data['phoneNumber'].value;
		var message = _data['wishes'];
		var imageUrl = $('#slider0')[0].src;
		window.plugins.socialsharing.shareViaWhatsAppToReceiver(receiver, message);
		//window.plugins.socialsharing.shareViaWhatsAppToReceiver(receiver, message, imageUrl);
	};

	//cordova.plugins.Whatsapp.send("1112223333");
	
	$rootScope.findContact = function(contact, result) {
		
		function onSuccess(contacts) {
		    if(contacts.length > 0){
		    	
		    	var info = '';
		    	contacts.forEach(function(contact) { 
		    		info = info + contact.displayName + ' ( ';
		    		
		    		contact.phoneNumbers.forEach(function(phoneNumber) {
		    			info = info + phoneNumber.type + ' : ' + phoneNumber.value + ' ,'; 
		    		});
		    		
		    		info = info + ' )'; 
		    	});
		    	if(result) {
		    		document.getElementById(contact).value = info;
		    	} else {
		    		alert('Contact Info #: ' + info);
		    	}
		    	
//		    	addresses 		- ContactAdress[] ( pref, type, formatted, streetAddress, locality, region, postalCode, country )
//		    	birthday 		- Date
//		    	categories 		- ContactField[] ( type, value, pref )
//		    	displayName		- String
//		    	emails			- ContactField[]
//		    	id				- String
//		    	ims				- ContactField[]
//		    	name			- ContactName ( formatted, familyName, givenName, middleName, honorificPrefix, honorificSuffix )		    	
//		    	nickname		- String
//		    	note			- String
//		    	organizations	- ContactOrganization[] ( pref, type, name, department, title )
//		    	phoneNumbers	- ContactField[]
//		    	photos			- ContactField[]
//		    	rawId			- 
//		    	urls			- ContactField[]
//		    	clone()
//		    	remove()
//				save()
		    } else {
		    	alert('Contact Not Found.');
		    }
		};

		function onError(contactError) {
		    alert('onError!');
		};

		// find all contacts with 'Bob' in any name field
		var options      = new ContactFindOptions();
		options.filter   = document.getElementById(contact).value;
		options.multiple = false;
		options.desiredFields = [navigator.contacts.fieldType.id, navigator.contacts.fieldType.displayName, navigator.contacts.fieldType.name , navigator.contacts.fieldType.phoneNumbers];
		options.hasPhoneNumber = true;
		var fields       = [navigator.contacts.fieldType.nickname, navigator.contacts.fieldType.displayName, navigator.contacts.fieldType.name];
		navigator.contacts.find(fields, onSuccess, onError, options);
	};
	

	$rootScope.notify = function(note) {
		
		var notification = document.getElementById(note).value;
		
		cordova.plugins.notification.local.schedule({
		    id: 1,
		    title : "Reminder",
		    text: notification,
		    //sound: isAndroid ? 'file://sound.mp3' : 'file://beep.caf',
		    data: { }
		    //at: new Date().getTime(),
		    //firstAt: monday,
		    //every: "day",
		    //icon: "file://img/logo.png",
			//smallIcon:"file://img/logo.png",
			//ongoing : false,
		});
		
	};
	
	
	$rootScope.selectFile = function(img) {
		fileChooser.open(function(imageSrc) {
			document.getElementById(img).src = imageSrc;
		});
	};

	var success = function (r) {
		console.log("Successful upload");
	};

	var fail = function (error) {
        alert("An error has occurred: Code = " + error.code);
    };
    
	$rootScope.uploadFile = function(filePath) {

		var file = document.getElementById(filePath).value;
		//var dir = file.substr(0, fileURL.lastIndexOf('/'));
		
		window.resolveLocalFileSystemURL(file, function(fileEntry) {
		    var fileURL = fileEntry.toURL();
	
		    var options = new FileUploadOptions();
		    options.fileKey = "file";
		    options.fileName = fileURL.substr(fileURL.lastIndexOf('/') + 1);
		    options.mimeType = "text/plain";
	
		    var ft = new FileTransfer();
		    ft.upload(fileURL, encodeURI(APPYBE_BASE_URL + '/file'), success, fail, options);
		});
	};
	
}