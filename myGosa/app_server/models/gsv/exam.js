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
	
		return connection.query("SELECT " +
				"(SELECT S.NAME FROM SCHEDULE S INNER JOIN APPLY A " +
				"ON S.SEQ = A.SCHEDULE_SEQ " +
				"WHERE A.SEQ = C.APPLY_SEQ " +
				"GROUP BY S.NAME) AS SCHEDULE_NAME, " +
				"C.CONTENTS AS CONTENTS, " +
				"(SELECT NAME FROM USER WHERE SEQ = C.USER_SEQ) AS USER_NAME, " +
				"C.USER_SEQ AS USER_SEQ , " +
				"C.DATE AS DATE " +
				"FROM COMMENT C " +
				"WHERE EXAM_SEQ = ? ORDER BY DATE DESC " + 
				"LIMIT ?, ?", [examSeq, begin, size], callback);
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
		
		return connection.query("SELECT COUNT(*) AS CNT FROM ( SELECT" +
				"(SELECT S.NAME FROM SCHEDULE S INNER JOIN APPLY A " +
				"ON S.SEQ = A.SCHEDULE_SEQ " +
				"WHERE A.SEQ = C.APPLY_SEQ " +
				"GROUP BY S.NAME) AS SCHEDULE_NAME, " +
				"C.CONTENTS AS CONTENTS, " +
				"(SELECT NAME FROM USER WHERE SEQ = C.USER_SEQ) AS USER_NAME, " +
				"C.USER_SEQ AS USER_SEQ , " +
				"C.DATE AS DATE " +
				"FROM COMMENT C " +
				"WHERE EXAM_SEQ = ? ORDER BY DATE DESC)C", [examSeq], callback);
	},
	
	selectApply : function (examSeq, userSeq, callback) {
		
		return connection.query("SELECT A.SEQ AS APPLY_SEQ " +
				"FROM APPLY A INNER JOIN PERIOD P " +
				"ON A.PERIOD_SEQ = P.SEQ " +
				"WHERE P.EXAM_SEQ = ? AND A.USER_SEQ = ? " +
				"ORDER BY A.SEQ DESC LIMIT 1",[examSeq, userSeq], callback);
	},
	
	InsertComment : function (params, callback){
		return connection.query(
				"INSERT INTO COMMENT (APPLY_SEQ, EXAM_SEQ, USER_SEQ, CONTENTS, DATE) " +
				"VALUES (?, ?, ?, ?,  NOW())"
			, [params.applySeq, params.examSeq, params.userSeq, params.contents], callback);
	}
};

module.exports = Exam; 
