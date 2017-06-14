
function WebSQLDB() {
	
	this.init = function (callback) {
		try {
		    if (!window.openDatabase) {
		        alert('Local Databases are not supported by your browser.');
		    } else {
		        var shortName = 'APPYDB';
		        var version = '2.0';
		        var displayName = 'APPYDB';
		        var maxSize = 1000; // in bytes
		        navigator.APPYDB = openDatabase(shortName, version, displayName, maxSize);
		    }
		} catch(e) {
		    if (e == 2) {
		        console.log("Invalid database version.");
		    } else {
		        console.log("Error :"+ e +".");
		    }
		 } 
	};
	
	this.errorHandler = function(transaction, error) {
		console.log('Error :'+error.message+' , Code '+error.code+'.');
	};
	
	this.nullDataHandler = function() {
		console.log("No Data Available");
	};
	
	this.execDDL = function(sql, callback) {
		navigator.APPYDB.transaction( function (transaction) {
			transaction.executeSql(sql,[], this.nullDataHandler, this.errorHandler);
			if(callback){
				callback();
			}
		});
	};
	
	this.execDML = function(sql, data, callback) {
		navigator.APPYDB.transaction( function (transaction) {
	    	transaction.executeSql(sql, data, function(transaction, results){
	    		if(callback){
	    			callback(results);
	    		}	
	    	}, this.errorHandler);
	    	
	    });
	};
	
	this.checkTableExists = function(tableName, callback) {
		var sql = " SELECT name FROM sqlite_master WHERE type='table' and name ='" + tableName + "' ";
		this.execDML(sql, [], callback);
	};
	
	this.createTable = function(tableName, columnInfo, callback) {
		var sql = " CREATE TABLE IF NOT EXISTS " + tableName + " ( " + columnInfo + " ) ";
		this.execDDL(sql, callback);
	};
	
	this.dropTable = function(tableName, callback) {
		var sql = " DROP TABLE " + tableName;
		this.execDDL(sql, callback);
	};
	
	this.cleanTable = function(tableName, callback) {
		this.deleteRows(tableName, undefined, callback);
	};
	
	this.deleteRows = function(tableName, filter, callback) {
		var sql = " DELETE FROM TABLE " + tableName;
		if(filter) {
			sql = sql + " WHERE " + filter;
		}
		this.execDML(sql, [], callback);
	};
	
	this.fetchRows = function(tableName, filter, callback) {
		var sql = " SELECT * FROM " + tableName;
		if(filter) {
			sql = sql + " WHERE " + filter;
		}
		this.execDML(sql, [], callback);
	};
	
	this.saveRow = function(tableName, row, callback) {
		var columns = '', valueInfos = '', values = [];
		
		$.each(row, function(key, value) {
			columns += key + ", ";
			valueInfos +=  " ?, ";
			values.push(value);
		});
		
		columns = columns.substring(0, columns.length - 2);
		valueInfos = valueInfos.substring(0, valueInfos.length - 2);
		
		var sql = " INSERT INTO " + tableName + " ( " + columns + " ) VALUES ( " + valueInfos + " ) ";
		this.execDML(sql, values, callback);
	};
	
	return this;

}