
//var APPYBE_BASE_URL = "";
var APPYBE_BASE_URL = "https://my-appy-backend.appspot.com";

// Macro Local
//var APPYCDN_BASE_URL = "cdn";
//var APPYUI_BASE_URL = "ui";
//var APPYSTR_BASE_URL = "store/metadata";

// Micro Local
//var APPYCDN_BASE_URL = "/cdn";
//var APPYUI_BASE_URL = "/ui";
//var APPYSTR_BASE_URL = "/store/metadata";

//var port = 8181;
//var port = 8443;

// Micro Local - IP
//var APPYCDN_BASE_URL = "https://192.168.1.3:"+port+"/cdn";
//var APPYUI_BASE_URL = "https://192.168.1.3:"+port+"/ui";
//var APPYSTR_BASE_URL = "https://192.168.1.3:"+port+"/store/metadata";

// Macro Remote
//var APPYCDN_BASE_URL = "http://my-appy-launcher.appspot.com/cdn";
//var APPYUI_BASE_URL = "http://my-appy-launcher.appspot.com/ui";
//var APPYSTR_BASE_URL = "http://my-appy-launcher.appspot.com/store/metadata";

// Macro Remote - GitHub
var APPYCDN_BASE_URL = "https://appyfy.github.io/cdn/WebContent";
var APPYUI_BASE_URL = "https://appyfy.github.io/ui/WebContent";
var APPYSTR_BASE_URL = "https://goappyfy.github.io/store/WebContent/metadata";

// Micro Remote
//var APPYCDN_BASE_URL = "https://my-cdn-lite.appspot.com";
//var APPYUI_BASE_URL = "https://my-appy-ui.appspot.com";
//var APPYSTR_BASE_URL = "https://my-appy-store.appspot.com/metadata";

injectJS(APPYUI_BASE_URL + "/index.js");
