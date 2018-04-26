var mysql_dbc = require('../../mysql/db_con.js')();
var connection = mysql_dbc.init();

var Exam = {

	hstList : function(examSeq, begin, size, callback) {
		
		return connection.query("SELECT * FROM (SELECT " +
				"(SELECT NAME FROM SCHEDULE WHERE SEQ = P.SCHEDULE_SEQ AND SEQ = A.SCHEDULE_SEQ) AS SCHEDULE_NAME, " +
				"(SELECT NAME FROM DEPARTMENT WHERE SEQ = (SELECT DEPARTMENT_SEQ FROM USER WHERE SEQ = A.USER_SEQ)) AS DEPARTMENT, " +
				"(SELECT NAME FROM POSITION WHERE SEQ = (SELECT POSITION_SEQ FROM USER WHERE SEQ = A.USER_SEQ)) AS POSITION, " +
				"(SELECT NAME FROM USER WHERE SEQ = A.USER_SEQ) AS USER_NAME " +
				"FROM APPLY A INNER JOIN PERIOD P ON A.PERIOD_SEQ = P.SEQ " +
				"WHERE P.EXAM_SEQ = " + examSeq + " ORDER BY A.SEQ DESC) M " + 
				"LIMIT ?, ?", [begin, size], callback);
	}, 
	
	cmtList : function(examSeq, begin, size, callback) {
		console.log('cmtList begin:'+begin);
		console.log('cmtList size:'+size);
		
		return connection.query("SELECT * FROM (SELECT C.SEQ AS COMMENT_SEQ, " +
				"(SELECT NAME FROM SCHEDULE WHERE SEQ = A.SCHEDULE_SEQ) AS SCHEDULE_NAME, " +
				"C.CONTENTS AS CONTENTS," +
				"(SELECT NAME FROM USER WHERE SEQ = C.USER_SEQ) AS USER_NAME,  " +
				"C.USER_SEQ AS USER_SEQ " +
				"FROM COMMENT C INNER JOIN APPLY A " +
				"ON C.APPLY_SEQ = A.SEQ " +
				"WHERE C.EXAM_SEQ = "+examSeq+") M " + 
				"LIMIT ?, ?", [begin, size], callback);
	}, 

	
	hstCount : function (examSeq, callback) {
		
		return connection.query("SELECT COUNT(*) AS CNT FROM (SELECT * FROM (SELECT " +
				"(SELECT NAME FROM SCHEDULE WHERE SEQ = P.SCHEDULE_SEQ AND SEQ = A.SCHEDULE_SEQ) AS SCHEDULE_NAME, " +
				"(SELECT NAME FROM DEPARTMENT WHERE SEQ = (SELECT DEPARTMENT_SEQ FROM USER WHERE SEQ = A.USER_SEQ)) AS DEPARTMENT, " +
				"(SELECT NAME FROM POSITION WHERE SEQ = (SELECT POSITION_SEQ FROM USER WHERE SEQ = A.USER_SEQ)) AS POSITION, " +
				"(SELECT NAME FROM USER WHERE SEQ = A.USER_SEQ) AS USER_NAME " +
				"FROM APPLY A INNER JOIN PERIOD P ON A.PERIOD_SEQ = P.SEQ " +
				"WHERE P.EXAM_SEQ = " + examSeq + " ORDER BY A.SEQ DESC)M)C", callback);
	},

	cmtCount : function (examSeq, callback) {
		
		return connection.query("SELECT COUNT(*) AS CNT FROM (SELECT * FROM (SELECT C.SEQ AS COMMENT_SEQ, " +
				"(SELECT NAME FROM SCHEDULE WHERE SEQ = A.SCHEDULE_SEQ) AS SCHEDULE_NAME, " +
				"C.CONTENTS AS CONTENTS," +
				"(SELECT NAME FROM USER WHERE SEQ = C.USER_SEQ) AS USER_NAME, " +
				"C.USER_SEQ AS USER_SEQ " +
				"FROM COMMENT C INNER JOIN APPLY A " +
				"ON C.APPLY_SEQ = A.SEQ " +
				"WHERE C.EXAM_SEQ = "+examSeq+")M)C", callback);
	},
	
};

module.exports = Exam; 
