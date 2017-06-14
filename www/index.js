
var APPYBE_BASE_URL = "";
//var APPYBE_BASE_URL = "https://my-appy-backend.appspot.com";
//var APPYBE_BASE_URL = "http://nlp-my-appy-backend.1d35.starter-us-east-1.openshiftapps.com"

// Macro Local
var APPYCDN_BASE_URL = "cdn";
var APPYUI_BASE_URL = "ui";
var APPYSTR_BASE_URL = "store/metadata";

// Micro Local
//var APPYCDN_BASE_URL = "/cdn";
//var APPYUI_BASE_URL = "/ui";
//var APPYSTR_BASE_URL = "/store/metadata";

//var port = 8181;
//var port = 8443;

// Micro Local - IP-BSNL
//var APPYCDN_BASE_URL = "https://192.168.1.3:"+port+"/cdn";
//var APPYUI_BASE_URL = "https://192.168.1.3:"+port+"/ui";
//var APPYSTR_BASE_URL = "https://192.168.1.3:"+port+"/store/metadata";

// Micro Local - IP-NEXTRA
//var APPYCDN_BASE_URL = "http://192.168.1.85:"+port+"/cdn";
//var APPYUI_BASE_URL = "http://192.168.1.85:"+port+"/ui";
//var APPYSTR_BASE_URL = "http://192.168.1.85:"+port+"/store/metadata";

// Macro Remote
//var APPYCDN_BASE_URL = "http://my-appy-launcher.appspot.com/cdn";
//var APPYUI_BASE_URL = "http://my-appy-launcher.appspot.com/ui";
//var APPYSTR_BASE_URL = "http://my-appy-launcher.appspot.com/store/metadata";

//Macro Remote - AI
//var APPYCDN_BASE_URL = "http://my-ai-launcher.appspot.com/cdn";
//var APPYUI_BASE_URL = "http://my-ai-launcher.appspot.com/ui";
//var APPYSTR_BASE_URL = "http://my-ai-launcher.appspot.com/store/metadata";

// Micro Remote
//var APPYCDN_BASE_URL = "https://my-cdn-lite.appspot.com";
//var APPYUI_BASE_URL = "https://my-appy-ui.appspot.com";
//var APPYSTR_BASE_URL = "https://my-appy-store.appspot.com/metadata";

injectJS(APPYUI_BASE_URL + "/index.js");
