/**
 * http://usejsdoc.org/
 */
var mysql_dbc = require('../../mysql/db_con.js')();
var connection = mysql_dbc.init();


var Position = {
	count : function (callback) {
		return connection.query("SELECT COUNT(*) AS CNT FROM POSITION", callback);
	}, 
	
	list : function(begin, size, callback) {
		
		return connection.query("SELECT SEQ, NAME " +
				"FROM POSITION " +
				"ORDER BY SEQ DESC " +
				"LIMIT ?, ?", [begin, size], callback);
	}, 
	
	allLists : function (callback) {
		return connection.query("SELECT SEQ, NAME FROM POSITION", callback);
	}, 
};

module.exports = Position; 