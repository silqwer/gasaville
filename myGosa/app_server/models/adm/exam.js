/**
 * http://usejsdoc.org/
 */
var mysql_dbc = require('../../mysql/db_con.js')();
var connection = mysql_dbc.init();


var Exam = {
	
	list : function(begin, size, callback) {
	
		return connection.query("SELECT " +
				"SEQ, NAME, SCHOOL, ADDR " +
				"FROM EXAM " +
				"ORDER BY SEQ DESC " +
				"LIMIT ?, ?", [begin, size], callback);
	}, 
	
	count : function (callback) {
		return connection.query('SELECT COUNT(*) AS CNT FROM EXAM', callback);
	}, 
	
	read : function (seq, callback) {
		return connection.query("SELECT " +
				"SEQ, NAME, SCHOOL, ADDR " +
				"FROM EXAM " +
				"WHERE SEQ = ?", [seq], callback);
	}, 
	
	update : function (params, callback) {
		
		return connection.query("UPDATE EXAM " +
				"SET NAME = ?, " +
				"SCHOOL = ?, " +
				"ADDR = ? " +
				"WHERE SEQ = ?", [params.name, params.school, params.addr, params.seq], callback);
	}, 
	
	delete : function (seq, callback ) {
		return connection.query("DELETE FROM EXAM WHERE SEQ = ?", [seq], callback);
	}
	
};

module.exports = Exam; 