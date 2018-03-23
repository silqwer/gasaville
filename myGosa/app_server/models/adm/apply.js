/**
 * http://usejsdoc.org/
 */
var mysql_dbc = require('../../mysql/db_con.js')();
var connection = mysql_dbc.init();


var Apply = {
	
	count : function (callback) {
		return connection.query("SELECT COUNT(*) AS CNT " +
				"FROM APPLY A INNER JOIN PERIOD P " +
				"ON A.PERIOD_SEQ = P.SEQ ", callback);
	}, 
	
	list : function(begin, size, callback) {
		
		return connection.query("SELECT " +
				"(SELECT NAME FROM EXAM WHERE SEQ = P.EXAM_SEQ) AS EXAM_NAME, " +
				"(SELECT SCHOOL FROM EXAM WHERE SEQ = P.EXAM_SEQ) AS EXAM_SCHOOL, " +
				"P.CLASS AS CLASS, " +
				"(SELECT NAME FROM DEPARTMENT WHERE SEQ = (" +
				"SELECT DEPARTMENT_SEQ FROM USER WHERE SEQ = A.USER_SEQ)) AS DEPARTMENT," +
				"(SELECT NAME FROM POSITION WHERE SEQ = (" +
				"SELECT POSITION_SEQ FROM USER WHERE SEQ = A.USER_SEQ)) AS POSITION, " +
				"(SELECT NAME FROM USER WHERE SEQ = A.USER_SEQ) AS USER_NAME," +
				"(SELECT CELLPHONE FROM USER WHERE SEQ = A.USER_SEQ) AS CELLPHONE, " +
				"A.STATE AS STATE " +
				"FROM APPLY A INNER JOIN PERIOD P " +
				"ON A.PERIOD_SEQ = P.SEQ " +
				"ORDER BY A.SEQ DESC " +
				"LIMIT ?, ?", [begin, size], callback);
	}, 
	
	best : function (callback) {
		return connection.query("SELECT " +
				"(SELECT NAME FROM EXAM WHERE SEQ = P.EXAM_SEQ) AS EXAM_NAME, " +
				"(SELECT TIMESTAMPDIFF(SECOND, S.APPLY_DATE, A.DATE)) AS CLOSSING_TIME " +
				"FROM APPLY A INNER JOIN PERIOD P INNER JOIN SCHEDULE S " +
				"ON A.PERIOD_SEQ = P.SEQ AND P.SCHEDULE_SEQ = S.SEQ " +
				"ORDER BY CLOSSING_TIME ASC LIMIT 0,5", callback);
	}, 
	
	worst : function (callback) {
		return connection.query("SELECT " +
				"(SELECT NAME FROM EXAM WHERE SEQ = P.EXAM_SEQ) AS EXAM_NAME, " +
				"(SELECT TIMESTAMPDIFF(SECOND, S.APPLY_DATE, A.DATE)) AS CLOSSING_TIME " +
				"FROM APPLY A INNER JOIN PERIOD P INNER JOIN SCHEDULE S " +
				"ON A.PERIOD_SEQ = P.SEQ AND P.SCHEDULE_SEQ = S.SEQ " +
				"ORDER BY CLOSSING_TIME DESC LIMIT 0,5", callback);
	}, 
	
	userList : function (callback) {
		return connection.query("SELECT USER_SEQ FROM APPLY ", callback);
	}, 
	
	examRate : function (sum, seq, callback) {
		return connection.query("SELECT A.SEQ AS PERIOD_SEQ, " +
				"E.NAME AS EXAM_NAME, " +
				"(SELECT NAME FROM USER WHERE SEQ = A.USER_SEQ) AS USER_NAME, " +
				"COUNT(E.NAME) AS EXAM_COUNT, " +
				"ROUND((COUNT(E.NAME) / ?) * 100) AS EXAM_RATE " +
				"FROM APPLY A INNER JOIN PERIOD P INNER JOIN EXAM E " +
				"ON A.PERIOD_SEQ = P.SEQ AND P.EXAM_SEQ = E.SEQ " +
				"WHERE A.USER_SEQ = ? " +
				"GROUP BY A.SEQ", [sum, seq], callback);
	}, 
	
	
	visit : function (seq, callback) {
		return connection.query("SELECT E.NAME AS EXAM_NAME, E.SEQ AS EXAM_SEQ, " +
				"(SELECT NAME FROM USER WHERE SEQ = A.USER_SEQ) AS USER_NAME, " +
				"SUM((SELECT COUNT(NAME) FROM USER WHERE SEQ = A.USER_SEQ)) AS CNT_SUM " +
				"FROM APPLY A INNER JOIN PERIOD P INNER JOIN EXAM E " +
				"ON A.PERIOD_SEQ = P.SEQ AND P.EXAM_SEQ = E.SEQ " +
				"AND E.SEQ = ? " +
				"GROUP BY EXAM_NAME, USER_NAME " +
				"ORDER BY CNT_SUM DESC", [seq], callback);
	}, 
	
	accrue : function (date, callback) {
		return connection.query("SELECT (SELECT NAME FROM USER WHERE SEQ = A.USER_SEQ) AS USER_NAME, " +
				"COUNT(A.USER_SEQ) AS CNT " +
				"FROM APPLY A " +
				"WHERE DATE_FORMAT(DATE, '%Y') = ? " +
				"GROUP BY USER_NAME", [date], callback);
	}, 
	
	sum : function (seq, callback) {
		return connection.query("SELECT SUM(SEQ) AS SUM, " +
				"(SELECT NAME FROM USER WHERE SEQ = A.USER_SEQ) AS NAME " +
				"FROM APPLY A WHERE USER_SEQ = ?", [seq], callback);
	}, 
	
	
};

module.exports = Apply; 