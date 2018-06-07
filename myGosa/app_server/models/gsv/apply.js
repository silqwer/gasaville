/**
 * http://usejsdoc.org/
 */
var mysql_dbc = require('../../mysql/db_con.js')();
var connection = mysql_dbc.init();


var Apply = {
	
	count : function (userSeq, callback) {
		
		let sql = "SELECT COUNT(*) AS CNT FROM (SELECT " +
				"(SELECT NAME FROM EXAM WHERE SEQ = P.EXAM_SEQ) AS EXAM_NAME, " +
				"(SELECT SCHOOL FROM EXAM WHERE SEQ = P.EXAM_SEQ) AS EXAM_SCHOOL, " +
				"P.CLASS AS CLASS, " +
				"(SELECT NAME FROM DEPARTMENT WHERE SEQ = (" +
				"SELECT DEPARTMENT_SEQ FROM USER WHERE SEQ = A.USER_SEQ)) AS DEPARTMENT, " +
				"(SELECT NAME FROM POSITION WHERE SEQ = (" +
				"SELECT POSITION_SEQ FROM USER WHERE SEQ = A.USER_SEQ)) AS POSITION, " +
				"(SELECT NAME FROM USER WHERE SEQ = A.USER_SEQ) AS USER_NAME," +
				"(SELECT CELLPHONE FROM USER WHERE SEQ = A.USER_SEQ) AS CELLPHONE " +
				"FROM APPLY A INNER JOIN PERIOD P " +
				"ON A.PERIOD_SEQ = P.SEQ " +
				"WHERE A.USER_SEQ = " + userSeq + 
				" ORDER BY A.SEQ DESC) M ";
		
		return connection.query(sql , callback);
	}, 
	
	list : function(userSeq, begin, size, callback) {
		
		return connection.query("SELECT * FROM (SELECT P.SCHEDULE_SEQ AS SCHEDULE, " +
				"(SELECT NAME FROM EXAM WHERE SEQ = P.EXAM_SEQ) AS EXAM_NAME, " +
				"(SELECT SCHOOL FROM EXAM WHERE SEQ = P.EXAM_SEQ) AS EXAM_SCHOOL, " +
				"P.CLASS AS CLASS, " +
				"(SELECT NAME FROM DEPARTMENT WHERE SEQ = (" +
				"SELECT DEPARTMENT_SEQ FROM USER WHERE SEQ = A.USER_SEQ)) AS DEPARTMENT, " +
				"(SELECT NAME FROM POSITION WHERE SEQ = (" +
				"SELECT POSITION_SEQ FROM USER WHERE SEQ = A.USER_SEQ)) AS POSITION, " +
				"(SELECT NAME FROM USER WHERE SEQ = A.USER_SEQ) AS USER_NAME, " +
				"(SELECT CELLPHONE FROM USER WHERE SEQ = A.USER_SEQ) AS CELLPHONE " +
				"FROM APPLY A INNER JOIN PERIOD P " + 
				"ON A.PERIOD_SEQ = P.SEQ " +
				"WHERE A.USER_SEQ = " + userSeq + 
				" ORDER BY A.SEQ DESC) M " + 
				"LIMIT ?, ?", [begin, size], callback);
	}, 
};

module.exports = Apply; 