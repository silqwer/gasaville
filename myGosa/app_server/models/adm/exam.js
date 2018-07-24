/**
 * http://usejsdoc.org/
 */
var mysql_dbc = require('../../mysql/db_con.js')();
var connection = mysql_dbc.init();


var Exam = {
	
	list : function(category, word, begin, size, callback) {
		
		let sql = "";
		
		if(word !== undefined){
			switch(category){
			case "name":
				sql += " WHERE E.NAME LIKE '%"+word+"%'";
				break;
			case "school":
				sql += " WHERE E.SCHOOL LIKE '%"+word+"%'";
				break;
			case "addr":
				sql += " WHERE E.ADDR LIKE '%"+word+"%'";
				break;		
			}
		}
		
		return connection.query("SELECT " +
				"E.SEQ, E.NAME, E.SCHOOL, E.ADDR, C.CNT " +
				"FROM EXAM E LEFT " +
				"JOIN (SELECT COUNT(NAME) AS CNT, NAME " +
				"FROM EXAM GROUP BY NAME) C " +
				"ON E.NAME = C.NAME " + sql + 
				"ORDER BY E.NAME ASC " +
				"LIMIT ?, ?", [begin, size], callback);
	}, 
	
	allLists :  function(callback) {
	
		return connection.query("SELECT " +
				"SEQ, NAME, SCHOOL, ADDR " +
				"FROM EXAM " +
				"ORDER BY SEQ DESC " , callback);
	},  
	
	historyList : function(category, word, begin, size, callback) {
	
		let sql = "";
		
		if(word !== undefined){
			switch(category){
			case "examName":
				sql += " WHERE EXAM_NAME LIKE '%"+word+"%' ";
				break;
			case "school":
				sql += " WHERE EXAM_SCHOOL LIKE '%"+word+"%' ";
				break;
			case "period":
				sql += " WHERE SCHEDULE_NAME LIKE '%"+word+"%' ";
				break;
			case "department":
				sql += " WHERE DEPARTMENT LIKE '%"+word+"%' ";
				break;
			case "position":
				sql += " WHERE POSITION LIKE '%"+word+"%' ";
				break;
			case "name":
				sql += " WHERE USER_NAME LIKE '%"+word+"%' ";
				break;
			}
		}
		
		return connection.query("SELECT * FROM (SELECT " +
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
				"ORDER BY A.SEQ DESC) M " + sql +
				"LIMIT ?, ?", [begin, size], callback);
	}, 
	
	count : function (category, word, callback) {
		
		let sql = "SELECT COUNT(*) AS CNT FROM EXAM";
		
		if(word !== undefined){
			switch(category){
			case "name":
				sql += " WHERE NAME LIKE '%"+word+"%'";
				break;
			case "school":
				sql += " WHERE SCHOOL LIKE '%"+word+"%'";
				break;
			case "addr":
				sql += " WHERE ADDR LIKE '%"+word+"%'";
				break;		
			}
		}
		
		return connection.query(sql, callback);
	},  
	
	historyCount : function (category, word, callback) {
		
		let sql = "SELECT COUNT(*) AS CNT  FROM (SELECT " +
				"(SELECT NAME FROM EXAM WHERE SEQ = P.EXAM_SEQ) AS EXAM_NAME, " +
				"(SELECT SCHOOL FROM EXAM WHERE SEQ = P.EXAM_SEQ) AS EXAM_SCHOOL, " +
				"(SELECT NAME FROM SCHEDULE WHERE SEQ = P.SCHEDULE_SEQ AND SEQ = A.SCHEDULE_SEQ) AS SCHEDULE_NAME," +
				"(SELECT NAME FROM DEPARTMENT WHERE SEQ = (" +
				"SELECT DEPARTMENT_SEQ FROM USER WHERE SEQ = A.USER_SEQ)) AS DEPARTMENT, " +
				"(SELECT NAME FROM POSITION WHERE SEQ = (" +
				"SELECT POSITION_SEQ FROM USER WHERE SEQ = A.USER_SEQ)) AS POSITION, " +
				"(SELECT NAME FROM USER WHERE SEQ = A.USER_SEQ) AS USER_NAME " +
				"FROM APPLY A INNER JOIN PERIOD P ON A.PERIOD_SEQ = P.SEQ) M";
		
		if(word !== undefined){
			switch(category){
			case "examName":
				sql += " WHERE EXAM_NAME LIKE '%"+word+"%' ";
				break;
			case "school":
				sql += " WHERE EXAM_SCHOOL LIKE '%"+word+"%' ";
				break;
			case "period":
				sql += " WHERE SCHEDULE_NAME LIKE '%"+word+"%' ";
				break;
			case "department":
				sql += " WHERE DEPARTMENT LIKE '%"+word+"%' ";
				break;
			case "position":
				sql += " WHERE POSITION LIKE '%"+word+"%' ";
				break;
			case "name":
				sql += " WHERE USER_NAME LIKE '%"+word+"%' ";
				break;
			}
		}
		
		return connection.query(sql, callback);
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