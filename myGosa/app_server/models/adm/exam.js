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
	
	historyList : function(begin, size, callback) {
	
		return connection.query("SELECT " +
				"(SELECT NAME FROM EXAM WHERE SEQ = P.EXAM_SEQ) AS EXAM_NAME, " +
				"(SELECT SCHOOL FROM EXAM WHERE SEQ = P.EXAM_SEQ) AS EXAM_SCHOOL, " +
				"(SELECT NAME FROM SCHEDULE WHERE SEQ = P.SCHEDULE_SEQ AND SEQ = A.SCHEDULE_SEQ) AS SCHEDULE_NAME," +
				"(SELECT NAME FROM DEPARTMENT WHERE SEQ = (" +
				"SELECT DEPARTMENT_SEQ FROM USER WHERE SEQ = A.USER_SEQ)) AS DEPARTMENT," +
				"(SELECT NAME FROM POSITION WHERE SEQ = (" +
				"SELECT POSITION_SEQ FROM USER WHERE SEQ = A.USER_SEQ)) AS POSITION, " +
				"(SELECT NAME FROM USER WHERE SEQ = A.USER_SEQ) AS USER_NAME " +
				"FROM APPLY A INNER JOIN PERIOD P " +
				"ON A.PERIOD_SEQ = P.SEQ " +
				"ORDER BY A.SEQ DESC " +
				"LIMIT ?, ?", [begin, size], callback);
	}, 
	
	count : function (callback) {
		return connection.query('SELECT COUNT(*) AS CNT FROM EXAM', callback);
	}, 
	
	historyCount : function (callback) {
		return connection.query("SELECT COUNT(*) AS CNT " +
				"FROM APPLY A INNER JOIN PERIOD P " +
				"ON A.PERIOD_SEQ = P.SEQ ", callback);
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
	}, 
	
	insert : function (params, callback) {
		return connection.query("INSERT INTO EXAM (NAME, SCHOOL, ADDR)" +
				"VALUES (?, ?, ?)", [params.name, params.school, params.addr], callback);
	}, 
	
};

module.exports = Exam; 