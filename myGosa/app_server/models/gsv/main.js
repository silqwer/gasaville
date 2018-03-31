var mysql_dbc = require('../../mysql/db_con.js')();
var connection = mysql_dbc.init();

var Main = {
	scheduleInfo : function(callback) {
		return connection.query(
			"SELECT SCHEDULE.SEQ, NAME, DATE_FORMAT(APPLY_DATE, '%Y-%m-%d %h:%i:%s') AS APPLY_DATE, DATE_FORMAT(ATTENDANCE_DATE, '%Y-%m-%d') AS ATTENDANCE_DATE "+
			"FROM SCHEDULE AS SCHEDULE, "+
			"(SELECT "+ 
			"	IFNULL( "+
			"		(SELECT SEQ FROM SCHEDULE WHERE DATE_FORMAT(APPLY_DATE, '%Y-%m') = DATE_FORMAT(NOW(), '%Y-%m')) "+
			"	, MAX(SEQ)) AS SEQ "+
			"FROM SCHEDULE) AS SUB "+
			"WHERE SCHEDULE.SEQ=SUB.SEQ "
			, callback);
	},
	list : function (params, callback) {
		return connection.query(
			"SELECT PERIOD.SEQ, EXAM_SEQ, PERIOD.CLASS AS PERIOD_CLASS, EXAM_NAME, EXAM_SCHOOL, DEPARTMENT.NAME AS DEPARTMENT_NAME, USER.NAME, APPLY.CLASS AS USER_CLASS, "+
			"		IF(USER.SEQ=?, 1, 0) AS USER_STATUS "+
			"FROM "+
			"	(SELECT "+
			"		P.SEQ AS SEQ, P.EXAM_SEQ AS EXAM_SEQ, P.CLASS AS CLASS, E.NAME AS EXAM_NAME, E.SCHOOL AS EXAM_SCHOOL, E.ADDR AS EXAM_ADDR "+
			"	FROM PERIOD AS P LEFT JOIN EXAM AS E ON (P.EXAM_SEQ=E.SEQ) "+
			"	WHERE P.SCHEDULE_SEQ = ? "+
			"	) AS PERIOD "+
			"LEFT JOIN APPLY AS APPLY ON(PERIOD.SEQ=APPLY.PERIOD_SEQ AND PERIOD.CLASS=APPLY.CLASS) "+
			"LEFT JOIN USER AS USER ON(APPLY.USER_SEQ=USER.SEQ) "+
			"LEFT JOIN DEPARTMENT AS DEPARTMENT ON(USER.DEPARTMENT_SEQ=DEPARTMENT.SEQ) "
			,[params.user, params.schedule], callback);
	},
	possibleInsert : function(params, callback) {
		/*
		 * [result STATUS]
		 * 1 - 등록 데이터 존재 및 등록자가 본인.
		 * 2 - 등록 데이터 존재 하지만 본인이 아님.
		 * 0 - 데이터 없음.
		 */
		return connection.query(
			"SELECT "+
			"	CASE"+
			"	WHEN SEQ > 0 AND USER_SEQ = ? THEN 1"+
			"	WHEN SEQ > 0 AND USER_SEQ != ? THEN 2"+
			"	WHEN IFNULL(MAX(SEQ), 0) = 0 THEN 0"+
			"	END AS STATUS "+
			"FROM APPLY WHERE PERIOD_SEQ=?"
		, [params.user, params.user, params.seq], callback);
	},
	isCorrectUserData : function(params, callback) {
		return connection.query(
			"SELECT USER_SEQ FROM APPLY WHERE PERIOD_SEQ=? AND SCHEDULE_SEQ=? AND CLASS=?"	
		, [params.period, params.schedule, params.class], callback);
	},
	insertApply : function(params, callback) {
		return connection.query(
			"INSERT INTO APPLY (PERIOD_SEQ, SCHEDULE_SEQ, USER_SEQ, CLASS, IP, DATE) "+ 
			"VALUES (?, ?, ?, ?, ?, NOW()) "
		, [params.period, params.schedule, params.user, params.class, params.ip], callback);
	},
	deleteApply : function(params, callback) {
		return connection.query(
			"DELETE FROM APPLY WHERE PERIOD_SEQ=? AND SCHEDULE_SEQ=? AND USER_SEQ=? AND CLASS=?"
		,[params.period, params.schedule, params.user, params.class], callback);
	}
};

module.exports = Main; 
