/**
 * http://usejsdoc.org/
 */
var mysql_dbc = require('../../mysql/db_con.js')();
var connection = mysql_dbc.init();


var Periods = {
	
	list : function(begin, size, callback) {
		return connection.query("SELECT " +
				"SEQ, " +
				"NAME, " +
				"DATE_FORMAT(APPLY_DATE, '%Y-%m-%d') AS APPLY_DATE, " +
				"DATE_FORMAT(ATTENDANCE_DATE, '%Y-%m-%d') AS ATTENDANCE_DATE " +
				"FROM SCHEDULE ORDER BY ATTENDANCE_DATE DESC " +
				"LIMIT ?, ?", [begin, size], callback);
	},
	
	count : function (callback) {
		return connection.query('SELECT COUNT(*) AS CNT FROM SCHEDULE', callback);
	}
	
};

module.exports = Periods; 