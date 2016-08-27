
// Bundled
var APPYCDN_BASE_URL = "cdn";
var APPYUI_BASE_URL = "ui";
var APPYSTR_BASE_URL = "store/metadata";

// Relative
//var APPYCDN_BASE_URL = "/cdn";
//var APPYUI_BASE_URL = "/ui";
//var APPYSTR_BASE_URL = "/store/metadata";
//var APPYBE_BASE_URL = "/backend";

//IP
//var APPYCDN_BASE_URL = "http://192.168.1.88:8181/cdn";
//var APPYUI_BASE_URL = "http://192.168.1.88:8181/ui";
//var APPYSTR_BASE_URL = "http://192.168.1.88:8181/store/metadata";
//var APPYBE_BASE_URL = "http://192.168.1.88:8181/backend";

// Macro Server
//var APPYCDN_BASE_URL = "https://my-appy-launcher.appspot.com/cdn";
//var APPYUI_BASE_URL = "https://my-appy-launcher.appspot.com/ui";
//var APPYSTR_BASE_URL = "https://my-appy-launcher.appspot.com/store/metadata";
//var APPYBE_BASE_URL = "https://my-appy-launcher.appspot.com/backend";

// Micro Server
//var APPYCDN_BASE_URL = "https://my-cdn-lite.appspot.com";
//var APPYUI_BASE_URL = "https://my-appy-ui.appspot.com";
//var APPYSTR_BASE_URL = "https://my-appy-store.appspot.com/metadata";
//var APPYBE_BASE_URL = "https://my-appy-backend.appspot.com";


injectJS(APPYCDN_BASE_URL + "/core/device.js");
injectJS(APPYUI_BASE_URL + "/index.js");
