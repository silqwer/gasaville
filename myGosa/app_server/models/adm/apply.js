/**
 * http://usejsdoc.org/
 */
var mysql_dbc = require('../../mysql/db_con.js')();
var connection = mysql_dbc.init();


var Apply = {
	
	delete : function (seq, callback ) {
		return connection.query("DELETE FROM APPLY WHERE SCHEDULE_SEQ = ?", [seq], callback);
	},
	
};

module.exports = Apply; 