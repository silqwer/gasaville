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
		return connection.query('INSERT INTO USER (ID, PASSWORD) VALUES(?,?)', [Users.ID], [Users.PASSWORD], callback);
	}, 
	
	login : function (Users, callback) {
		return connection.query('SELECT * FROM USER WHERE ID = ? AND PASSWORD =? ', Users.id, Users.password, callback);
	}, 
	
	findById : function (id, callback) {
		return connection.query('SELECT * FROM USER WHERE ID = ?', [id], callback);
	}
};

module.exports = Users; 