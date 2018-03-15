var mysql_dbc = require('../../mysql/db_con.js')();
var connection = mysql_dbc.init();

var Join = {
	insert : function (params, callback) {
		console.log(params);
		return connection.query("INSERT INTO USER (ID, NAME, PASSWORD, CELLPHONE, DEPARTMENT_SEQ, POSITION_SEQ)" +
				"VALUES (?, ?, ?, ?, ?, ?)", 
				[params.id, params.name, params.password, params.cellphone, params.department_seq, params.position_seq], callback);
	}
};

module.exports = Join; 
