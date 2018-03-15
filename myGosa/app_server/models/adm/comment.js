/**
 * http://usejsdoc.org/
 */
var mysql_dbc = require('../../mysql/db_con.js')();
var connection = mysql_dbc.init();


var Comment = {
	
	list : function(begin, size, callback) {
	
		return connection.query("SELECT " +
				"SEQ, CONTENTS, " +
				"(SELECT NAME FROM EXAM WHERE SEQ = EXAM_SEQ) AS EXAM," +
				"(SELECT SCHOOL FROM EXAM WHERE SEQ = EXAM_SEQ) AS SCHOOL, " +
				"(SELECT NAME FROM USER WHERE SEQ = USER_SEQ) AS NAME " +
				"FROM COMMENT " +
				"ORDER BY SEQ DESC " +
				"LIMIT ?, ?", [begin, size], callback);
	}, 
	
	count : function (callback) {
		return connection.query('SELECT COUNT(*) AS CNT FROM COMMENT', callback);
	}, 
	
	read : function (seq, callback) {
		return connection.query("SELECT " +
				"SEQ, CONTENTS, " +
				"(SELECT NAME FROM EXAM WHERE SEQ = EXAM_SEQ) AS EXAM, " +
				"(SELECT SCHOOL FROM EXAM WHERE SEQ = EXAM_SEQ) AS SCHOOL, " +
				"(SELECT NAME FROM USER WHERE SEQ = USER_SEQ) AS NAME, " +
				"(SELECT NAME FROM SCHEDULE WHERE SEQ = (" +
				"SELECT SCHEDULE_SEQ FROM APPLY WHERE SEQ = APPLY_SEQ)) AS SCHEDULE, " +
				"(SELECT NAME FROM DEPARTMENT WHERE SEQ = (" +
				"SELECT DEPARTMENT_SEQ FROM USER WHERE SEQ = USER_SEQ)) AS DEPARTMENT, " +
				"(SELECT NAME FROM POSITION WHERE SEQ = USER_SEQ) AS POSITION " +
				"FROM COMMENT WHERE SEQ = ?", [seq], callback);
	}, 
	
	delete : function (seq, callback ) {
		return connection.query("DELETE FROM COMMENT WHERE SEQ = ?", [seq], callback);
	}, 
	
};

module.exports = Comment; 