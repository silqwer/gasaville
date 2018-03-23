/**
 * http://usejsdoc.org/
 */
var mysql_dbc = require('../../mysql/db_con.js')();
var connection = mysql_dbc.init();


var Schedule = {
	
	list : function(callback) {
		return connection.query("SELECT " +
				"SEQ, " +
				"NAME, " +
				"DATE_FORMAT(APPLY_DATE, '%Y-%m-%d') AS APPLY_DATE, " +
				"DATE_FORMAT(ATTENDANCE_DATE, '%Y-%m-%d') AS ATTENDANCE_DATE " +
				"FROM SCHEDULE", callback);
	}, 
	
	dateList : function(callback) {
		return connection.query("SELECT DISTINCT DATE_FORMAT(APPLY_DATE, '%Y') AS APPLY_DATE " +
				"FROM SCHEDULE " +
				"ORDER BY APPLY_DATE DESC " +
				"LIMIT 0, 3", callback);
	}, 
	
	insert : function (params, callback) {
		return connection.query("INSERT INTO SCHEDULE (NAME, APPLY_DATE, ATTENDANCE_DATE)" +
				"VALUES (?, ?, ?)", [params.name, params.applyDate, params.attendanceDate], callback);
	}, 
	
	delete : function (seq, callback) {
		return connection.query("DELETE FROM SCHEDULE WHERE SEQ = ?", [seq], callback);
	}, 
	
	update : function (params, callback) {
	
		return connection.query("UPDATE SCHEDULE " +
				"SET NAME = ?, " +
				"APPLY_DATE = ?, " +
				"ATTENDANCE_DATE = ? " +
				"WHERE SEQ = ?", [params.name, params.applyDate, params.attendanceDate, params.seq], callback);
	} 

	
};

module.exports = Schedule; 