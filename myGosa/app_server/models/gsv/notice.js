var mysql_dbc = require('../../mysql/db_con.js')();
var connection = mysql_dbc.init();

var Notice = {
	list : function (page, callback) {
		return connection.query(
			"SELECT "+
			"@ROWNUM := @ROWNUM+1 AS NUM, NOTICE.SEQ, NOTICE.TITLE, DATE_FORMAT(NOTICE.DATE, '%Y-%m-%d') AS DATE, USER.ID, USER.NAME "+
			"FROM NOTICE AS NOTICE LEFT JOIN USER AS USER ON (NOTICE.USER_SEQ =  USER.SEQ),"+
			"(SELECT @ROWNUM:=0) R "+
			"ORDER BY NUM DESC "+
			"LIMIT ?, 10",
			page, callback);
	},

	view : function (view, callback) {
		return connection.query(
			"SELECT "+
			"NOTICE.SEQ, NOTICE.TITLE, NOTICE.CONTENTS AS CONTENTS, DATE_FORMAT(NOTICE.DATE, '%Y-%m-%d') AS DATE, USER.ID, USER.NAME "+
			"FROM NOTICE AS NOTICE LEFT JOIN USER AS USER ON (NOTICE.USER_SEQ =  USER.SEQ) "+
			"WHERE NOTICE.SEQ=?",
			view, callback);
	},

	count : function (callback) {
		return connection.query("SELECT COUNT(*) AS COUNT FROM NOTICE", callback);
	},

	getNearRecored : function(record, callback) {
		return connection.query(
			"SELECT DISTINCT SEQ, TITLE, DATE_FORMAT(DATE, '%Y-%m-%d') AS DATE FROM NOTICE "+
			"WHERE ("+
			"	SEQ = IFNULL((SELECT MIN(SEQ) FROM NOTICE WHERE SEQ > ?), 0) OR "+
			"	SEQ = IFNULL((SELECT MAX(SEQ) FROM NOTICE WHERE SEQ < ?), 0)) ", [record, record], callback);
	}
};

module.exports = Notice; 
