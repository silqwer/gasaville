/**
 * http://usejsdoc.org/
 */
var mysql_dbc = require('../../mysql/db_con.js')();
var connection = mysql_dbc.init();


var Users = {
	all : function(callback) {
		return connection.query('SELECT * FROM USER', callback);
	}, 
	
	select : function (seq, callback) {
		return connection.query('SELECT * FROM USER WHERE SEQ = ?',[seq], callback);
	},
	
	insert : function (Users, callback) {
		return connection.query('INSERT INTO USER (ID, PASSWORD) VALUES(?,?)', [Users.ID, Users.PASSWORD], callback);
	}, 
	
	login : function (Users, callback) {
		return connection.query('SELECT * FROM USER WHERE ID = ? AND PASSWORD =? ', [Users.id, Users.password], callback);
	}, 
	
	findById : function (id, callback) {
		return connection.query('SELECT * FROM USER WHERE ID = ?', [id], callback);
	}, 
	
	count : function (callback) {
		return connection.query('SELECT COUNT(*) AS CNT FROM USER', callback);
	}, 
	
	list : function(begin, size, callback) {
		return connection.query("SELECT SEQ, ID, NAME, " +
				"(SELECT NAME FROM DEPARTMENT WHERE SEQ = U.DEPARTMENT_SEQ) AS DEPARTMENT, " +
				"(SELECT NAME FROM POSITION WHERE SEQ = U.POSITION_SEQ) AS POSITION , " +
				"CELLPHONE FROM USER U " +
				"ORDER BY SEQ DESC " +
				"LIMIT ?, ?", [begin, size], callback);
	},
	
	update : function (params, callback) {
		
		return connection.query("UPDATE USER " +
				"SET NAME = ?, " +
				"CELLPHONE = ?, " +
				"DEPARTMENT_SEQ = ?, " +
				"POSITION_SEQ = ?, " +
				"ADMIN = ? " +
				"WHERE SEQ = ?", [params.name, params.cellphone, params.department, params.position, params.admin, params.seq], callback);
	}, 
	
	delete : function (seq, callback ) {
		return connection.query("DELETE FROM USER WHERE SEQ = ?", [seq], callback);
	},
};

module.exports = Users; 