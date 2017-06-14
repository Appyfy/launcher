
function WebFile() {
	
	function successHandler(fs) {
		console.log('Opened File System: ' + fs.name);

		// Read Dir
//		fs.root.getDirectory('MyPictures', {create: true}, function(dirEntry) {
//			console.log("Created/Opened Dir :" + dirEntry.name);
//		}, errorHandler);
		

		// Read Dir Tree
//		var dirReader = fs.root.createReader();
//		var entries = [];
//		
//		var readEntries = function() {
//			dirReader.readEntries (function(results) {
//				if (!results.length) {
//					listResults(entries.sort());
//				} else {
//					entries = entries.concat(toArray(results));
//					readEntries();
//				}
//			}, errorHandler);
//		};
//		
//		readEntries();
		
		// Remove Dir Tree
//		dirEntry.removeRecursively(function() {
//			console.log('Directory removed.');
//		}, errorHandler);


		fs.root.getFile('Users.csv', {create: true, exclusive: true}, function(fileEntry) {
			console.log("Created/Opened File :" + fileEntry.name);
			
			// Read File
//			fileEntry.file(function(file) {
//				var reader = new FileReader();
//				reader.onloadend = function(e) {
//					console.log(this.result);
//				};
//				reader.readAsText(file);
//
//			}, errorHandler);
			
			// Write File
			fileEntry.createWriter(function(fileWriter) {
	
				//fileWriter.seek(fileWriter.length);
				
				fileWriter.onwriteend = function(e) {
					console.log('Write completed.');
				};
				fileWriter.onerror = function(e) {
					console.log('Write failed: ' + e.toString());
				};
				
				var blob = new Blob(['Lorem Ipsum'], {type: 'text/plain'});
				fileWriter.write(blob);
				
			}, errorHandler);
			
			// Remove File/Dir
//			fileEntry.remove(function() {
//				console.log('File removed.');
//			}, errorHandler);
			
			// Copy File
//			fileEntry.copyTo(dirEntry);
			
			// Move/Rename File
//			fileEntry.moveTo(cwd, newName);
			
		}, errorHandler);
		
		
	}
	
	function errorHandler(e) {
		console.log('File System Error: ' + e.code);
	}

	window.requestFileSystem  = window.requestFileSystem || window.webkitRequestFileSystem;

	navigator.webkitTemporaryStorage.queryUsageAndQuota(function(usedBytes, grantedBytes) {
		console.log('we are using ', usedBytes, ' of ', grantedBytes, 'bytes');
	}, function(e) {
		console.log('Error', e);
	});

	var requestedBytes = 1024*1024*280; 
	navigator.webkitPersistentStorage.requestQuota(requestedBytes, function(grantedBytes) {  
		console.log('we were granted ', grantedBytes, 'bytes');
	}, function(e) {
		console.log('Error', e);
	});

	window.requestFileSystem(window.TEMPORARY, 5*1024*1024 /*5MB*/, successHandler, errorHandler);
	
	
	
	return this;

}