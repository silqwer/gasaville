/**
 * http://usejsdoc.org/
 */
var mysql_dbc = require('../../mysql/db_con.js')();
var connection = mysql_dbc.init();

var Users = {
	all : function(callback){
		return connection.query('SELECT * FROM MEMBER', callback);
	}, 
	
	select : function (seq, callback){
		return connection.query('SELECT * FROM MEMBER WHERE SEQ = ?',[seq], callback);
	},
	
	insert : function (Users, callback){
		return connection.query('INSERT INTO MEMBER VALUES(?,?)', Users.id, Users.name, callback);
	}
};

module.exports = Users; 