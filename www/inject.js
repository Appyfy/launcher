function injectCSS(href) {
	var link = document.createElement('link');
	link.rel = 'stylesheet';
	link.href = href;
	document.head.appendChild(link);
}

function injectJS(src) {
	var script = document.createElement('script');
	script.type="text/javascript";
	script.src = src;
	document.body.appendChild(script);
}

function winLib(lib) {
	return window[lib];
}

function defer(container, lib, callback) {
    if (container(lib)) {
    	callback();
    } else {
    	setTimeout(function() { 
    		defer(container, lib, callback); 
    	}, 50);
    }
}