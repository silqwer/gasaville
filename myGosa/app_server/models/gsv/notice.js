var mysql_dbc = require('../../mysql/db_con.js')();
var connection = mysql_dbc.init();

var Notice = {
	list : function (page, callback) {
		return connection.query(
			"SELECT NOTICE.*, USER.ID, USER.NAME FROM NOTICE AS NOTICE LEFT JOIN USER AS USER ON (NOTICE.USER_SEQ=USER.SEQ) "
			+" LIMIT ?, 10", 
			page, callback);
	}
};

module.exports = Notice; 
