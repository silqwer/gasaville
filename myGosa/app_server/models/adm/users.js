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
	
	login : function (Users, callback) {
		return connection.query('SELECT * FROM USER WHERE ID = ? AND PASSWORD =? ', [Users.id, Users.password], callback);
	}, 
	
	count : function (category, word, callback) {
		let sql = "SELECT COUNT(*) AS CNT FROM (SELECT SEQ, ID, NAME, " +
				"(SELECT NAME FROM DEPARTMENT WHERE SEQ = U.DEPARTMENT_SEQ) AS DEPARTMENT, " +
				"(SELECT NAME FROM POSITION WHERE SEQ = U.POSITION_SEQ) AS POSITION , " +
				"CELLPHONE FROM USER U) M ";
		
		if(word !== undefined){
			switch(category){
			case "id":
				sql += " WHERE ID LIKE '%"+word+"%'";
				break;
			case "name":
				sql += " WHERE NAME LIKE '%"+word+"%'";
				break;
			case "department":
				sql += " WHERE DEPARTMENT LIKE '%"+word+"%'";
				break;	
			case "position":
				sql += " WHERE POSITION LIKE '%"+word+"%'";
				break;	
			case "cellphone":
				sql += " WHERE CELLPHONE LIKE '%"+word+"%'";
				break;	
			}
		}
	
		return connection.query(sql, callback);
	}, 
	
	list : function(category, word,  begin, size, callback) {
		
		let sql = "";
		
		if(word !== undefined){
			switch(category){
			case "id":
				sql += "WHERE ID LIKE '%"+word+"%' ";
				break;
			case "name":
				sql += "WHERE NAME LIKE '%"+word+"%' ";
				break;
			case "department":
				sql += "WHERE DEPARTMENT LIKE '%"+word+"%' ";
				break;	
			case "position":
				sql += "WHERE POSITION LIKE '%"+word+"%' ";
				break;	
			case "cellphone":
				sql += "WHERE CELLPHONE LIKE '%"+word+"%' ";
				break;	
			}
		}
		
		return connection.query("SELECT * FROM (SELECT SEQ, ID, NAME, " +
				"(SELECT NAME FROM DEPARTMENT WHERE SEQ = U.DEPARTMENT_SEQ) AS DEPARTMENT, " +
				"(SELECT NAME FROM POSITION WHERE SEQ = U.POSITION_SEQ) AS POSITION , " +
				"CELLPHONE FROM USER U) M " + sql + 
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