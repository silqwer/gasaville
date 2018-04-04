/**
 * http://usejsdoc.org/
 */
var mysql_dbc = require('../../mysql/db_con.js')();
var connection = mysql_dbc.init();


var Notice = {
	count : function (category, word, callback) {
		
		let sql = "SELECT COUNT(*) AS CNT FROM NOTICE";
		
		if(word !== undefined){
			switch(category){
			case "title":
				sql += " WHERE TITLE LIKE '%"+word+"%'";
				break;
			case "contents":
				sql += " WHERE CONTENTS LIKE '%"+word+"%'";
				break;
			}
		}
		console.log('category:'+category);
		console.log('word:'+word);
		
		return connection.query(sql, callback);
	}, 
	
	list : function(category, word, begin, size, callback) {
		
		let sql = "";
		
		if(word !== undefined){
			switch(category){
			case "title":
				sql += "WHERE TITLE LIKE '%"+word+"%' ";
				break;
			case "contents":
				sql += "WHERE CONTENTS LIKE '%"+word+"%' ";
				break;
			}
		}
		
		return connection.query("SELECT SEQ, TITLE, " +
				"DATE_FORMAT(START_DATE, '%Y-%m-%d') AS START_DATE, " +
				"DATE_FORMAT(END_DATE, '%Y-%m-%d') AS END_DATE " +
				"FROM NOTICE " + sql +
				"ORDER BY SEQ DESC " +
				"LIMIT ?, ?", [begin, size], callback);
	}, 
	
	insert : function (params, callback) {
		return connection.query("INSERT INTO NOTICE (TITLE, CONTENTS, START_DATE, END_DATE)" +
				"VALUES (?, ?, ?, ?)", [params.title, params.contents, params.startDate, params.endDate], callback);
	}, 
	
	read : function (seq, callback) {
		return connection.query("SELECT SEQ, TITLE, CONTENTS, " +
				"DATE_FORMAT(START_DATE, '%Y-%m-%d') AS START_DATE, " +
				"DATE_FORMAT(END_DATE, '%Y-%m-%d') AS END_DATE, " +
				"DATE_FORMAT(DATE, '%Y-%m-%d') AS DATE " +
				"FROM NOTICE " +
				"WHERE SEQ = ?", [seq], callback);
	},
	
	upDown : function (seq, callback) {
		let pre = Number(seq)-1;
		let next = Number(seq)+1;
		
		return connection.query("SELECT SEQ,TITLE, DATE_FORMAT(DATE, '%Y-%m-%d') AS DATE FROM NOTICE WHERE SEQ = ? " +
				"UNION " +
				"SELECT SEQ, TITLE, DATE_FORMAT(DATE, '%Y-%m-%d') AS DATE FROM NOTICE WHERE SEQ = ?", [pre, next], callback);
	},
	
	update : function (params, callback) {
		
		return connection.query("UPDATE NOTICE " +
				"SET TITLE = ?, " +
				"CONTENTS = ?, " +
				"START_DATE = ?, " +
				"END_DATE = ? " +
				"WHERE SEQ = ?", [params.title, params.contents, params.startDate, params.endDate, params.seq], callback);
	}, 
	
	delete : function (seq, callback ) {
		return connection.query("DELETE FROM NOTICE WHERE SEQ = ?", [seq], callback);
	}, 
};

module.exports = Notice; 