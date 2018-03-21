/**
 * http://usejsdoc.org/
 */
var mysql_dbc = require('../../mysql/db_con.js')();
var connection = mysql_dbc.init();


var Department = {
	allLists : function (callback) {
		return connection.query("SELECT SEQ, NAME FROM DEPARTMENT", callback);
	}, 
	
	update : function (params, callback) {
		return connection.query("UPDATE DEPARTMENT " +
				"SET NAME = ? " +
				"WHERE SEQ = ?", [params.name, params.seq], callback);
	}, 
	
	delete : function (seq, callback) {
		return connection.query("DELETE FROM DEPARTMENT WHERE SEQ = ?", [seq], callback);
	}, 
	
	allLists : function (callback) {
		return connection.query("SELECT SEQ, NAME FROM DEPARTMENT", callback);
	},
	
	check : function (name, callback) {
		return connection.query("SELECT COUNT(*) AS CNT " +
				"FROM DEPARTMENT WHERE NAME = ?", [name], callback);
	}, 
	
	insert : function (name, callback) {
		return connection.query("INSERT INTO DEPARTMENT (NAME) VALUES (?)", [name], callback);
	}, 
};

module.exports = Department; 