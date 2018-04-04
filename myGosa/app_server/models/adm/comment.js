/**
 * http://usejsdoc.org/
 */
var mysql_dbc = require('../../mysql/db_con.js')();
var connection = mysql_dbc.init();


var Comment = {
	
	list : function(category, word, begin, size, callback) {
	
		let sql = "";
		
		if(word !== undefined){
			switch(category){
			case "name":
				sql += " WHERE NAME LIKE '%"+word+"%' ";
				break;
			case "school":
				sql += " WHERE SCHOOL LIKE '%"+word+"%' ";
				break;
			case "exam":
				sql += " WHERE EXAM_NAME LIKE '%"+word+"%' ";
				break;		
			}
		}
		
		return connection.query("SELECT * FROM (SELECT " +
				"SEQ, CONTENTS, " +
				"(SELECT NAME FROM EXAM WHERE SEQ = EXAM_SEQ) AS EXAM_NAME, " +
				"(SELECT SCHOOL FROM EXAM WHERE SEQ = EXAM_SEQ) AS SCHOOL, " +
				"(SELECT NAME FROM USER WHERE SEQ = USER_SEQ) AS NAME " +
				"FROM COMMENT " +
				"ORDER BY SEQ DESC) C " + sql +
				"LIMIT ?, ?", [begin, size], callback);
	}, 
	
	count : function (category, word, callback) {
		
		let sql = "SELECT COUNT(*) AS CNT FROM (SELECT SEQ, CONTENTS, " +
				"(SELECT NAME FROM EXAM WHERE SEQ = EXAM_SEQ) AS EXAM_NAME, " +
				"(SELECT SCHOOL FROM EXAM WHERE SEQ = EXAM_SEQ) AS SCHOOL, " +
				"(SELECT NAME FROM USER WHERE SEQ = USER_SEQ) AS NAME " +
				"FROM COMMENT) C";
	
		if(word !== undefined){
			switch(category){
			case "name":
				sql += " WHERE NAME LIKE '%"+word+"%'";
				break;
			case "school":
				sql += " WHERE SCHOOL LIKE '%"+word+"%'";
				break;
			case "name":
				sql += " WHERE ADDR LIKE '%"+word+"%'";
				break;		
			}
		}
		
		return connection.query(sql, callback);
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