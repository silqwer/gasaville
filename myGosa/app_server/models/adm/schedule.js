/**
 * http://usejsdoc.org/
 */
var mysql_dbc = require('../../mysql/db_con.js')();
var connection = mysql_dbc.init();


var Schedule = {
	
	list : function(callback) {
		return connection.query("SELECT " +
				"SEQ AS seq, " +
				"NAME AS title, " +
				"DATE_FORMAT(APPLY_DATE, '%Y-%m-%d') AS start, " +
				"DATE_FORMAT(ATTENDANCE_DATE, '%Y-%m-%d') AS attendance_date " +
				"FROM SCHEDULE", callback);
	}, 
	
	insert : function (params, callback) {
		return connection.query("INSERT INTO SCHEDULE (NAME, APPLY_DATE, ATTENDANCE_DATE)" +
				"VALUES (?, ?, ?)", [params.name, params.applyDate, params.attendanceDate], callback);
	} 

	
};

module.exports = Schedule; 