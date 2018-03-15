/**
 * http://usejsdoc.org/
 */
var mysql_dbc = require('../../mysql/db_con.js')();
var connection = mysql_dbc.init();


var Notice = {
	count : function (callback) {
		return connection.query('SELECT COUNT(*) AS CNT FROM NOTICE', callback);
	}, 
	
	list : function(begin, size, callback) {
		
		return connection.query("SELECT SEQ, TITLE, " +
				"DATE_FORMAT(START_DATE, '%Y-%m-%d') AS START_DATE, " +
				"DATE_FORMAT(END_DATE, '%Y-%m-%d') AS END_DATE " +
				"FROM NOTICE " +
				"ORDER BY SEQ DESC " +
				"LIMIT ?, ?", [begin, size], callback);
	}, 
	
	insert : function (params, callback) {
		return connection.query("INSERT INTO NOTICE (TITLE, CONTENTS, START_DATE, END_DATE)" +
				"VALUES (?, ?, ?, ?)", [params.title, params.contents, params.startDate, params.endDate], callback);
	}, 
	
	read : function (seq, callback) {
		return connection.query("SELECT SEQ, TITLE, CONTENTS, " +
				"DATE_FORMAT(START_DATE, '%Y-%m-%d') AS START_DATE, " +
				"DATE_FORMAT(END_DATE, '%Y-%m-%d') AS END_DATE " +
				"FROM NOTICE " +
				"WHERE SEQ = ?", [seq], callback);
	},
	
	update : function (params, callback) {
		
		return connection.query("UPDATE NOTICE " +
				"SET TITLE = ?, " +
				"CONTENTS = ?, " +
				"START_DATE = ?, " +
				"END_DATE = ? " +
				"WHERE SEQ = ?", [params.title, params.contents, params.startDate, params.endDate, params.seq], callback);
	}, 
	
	delete : function (seq, callback ) {
		return connection.query("DELETE FROM NOTICE WHERE SEQ = ?", [seq], callback);
	}, 
};

module.exports = Notice; 