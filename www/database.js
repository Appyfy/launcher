
function initDatabase(callback) {
	try {
	    if (!window.openDatabase) {
	        alert('Local Databases are not supported by your browser.');
	    } else {
	        var shortName = 'Appy';
	        var version = '2.0';
	        var displayName = 'Appy';
	        var maxSize = 100000; // in bytes
	        APPYDB = openDatabase(shortName, version, displayName, maxSize);
			createDefaultTables(callback);
	    }
	} catch(e) {
	    if (e == 2) {
	        console.log("Invalid database version.");
	    } else {
	        console.log("Error :"+ e +".");
	    }
	 } 
}

function errorHandler(transaction, error){
	console.log('Error :'+error.message+' , Code '+error.code+'.');
}

function nullDataHandler(){
	console.log("No Data Available");
}

function createDefaultTables(callback){
	execDDL("CREATE TABLE IF NOT EXISTS application_data(property TEXT PRIMARY KEY, value TEXT );");
}

function execDDL(sql, callback) {
	APPYDB.transaction( function (transaction) {
		transaction.executeSql(sql,[], nullDataHandler, errorHandler);
		if(callback){
			callback();
		}
	});
}

function execDML(sql, data, callback) {
	APPYDB.transaction( function (transaction) {
    	transaction.executeSql(sql, data, function(transaction, results){
    		if(callback){
    			callback(results);
    		}	
    	}, errorHandler);
    	
    });
}

function checkTableExists(tableName, callback) {
	var sql = "SELECT name FROM sqlite_master WHERE type='table' and name ='" + tableName + "'";
	execDML(sql, [], callback);
}

function createTable(tableName, columnInfo, callback) {
	var sql = " CREATE TABLE IF NOT EXISTS " + tableName + " ( " + columnInfo + " ) ";
	execDDL(sql, callback);
}

function getRows(tableName, filter, callback) {
	var sql = "SELECT * FROM " + tableName;
	if(filter) {
		sql = sql + " " + filter;
	}
	execDML(sql, [], callback);
}

function deleteRows(tableName, filter, callback) {
	
}

function saveRow(tableName, row, callback) {
	var columns = '', valueInfos = '', values = [];
	$.each(row, function(key, value) {
		columns += key + ", ";
		valueInfos +=  " ?, ";
		values.push(value);
	});
	columns = columns.substring(0, columns.length - 2);
	valueInfos = valueInfos.substring(0, valueInfos.length - 2);
	
	var sql = "INSERT INTO " + tableName + " ( " + columns + " ) VALUES ( " + valueInfos + " ) ";
	execDML(sql, values, callback);
}

