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
		return connection.query('INSERT INTO USER VALUES(?,?)', Users.id, Users.name, callback);
	}, 
	
	login : function (Users, callback) {
		//return connection.query('SELECT * FROM USER WHERE ID = ? AND PASSWORD =? ', Users.id, Users.password, callback);
		return connection.query('SELECT * FROM USER', callback);
	}
};

module.exports = Users; 