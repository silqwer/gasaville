/*
 * @comment : 사용자 회원가입 models
 * ------------------------------
 * @date 	: update-2018.03.20
 * @author 	: vayu@tekville.com
 * @brief 	: 
 * 	insert 			=> 회원가입 데이터 저장
 *	departmentList 	=> 부서 데이터 호출
 * 	positionList 	=> 직급 데이터 호출 	
 *
 */

var mysql_dbc = require('../../mysql/db_con.js')();
var connection = mysql_dbc.init();

var Join = {
	insert : function (params, callback) {
		return connection.query("INSERT INTO USER (ID, NAME, PASSWORD, CELLPHONE, DEPARTMENT_SEQ, POSITION_SEQ)" +
				"VALUES (?, ?, ?, ?, ?, ?)", 
				[params.id, params.name, params.password, params.cellphone, params.department_seq, params.position_seq], callback);
	},

	departmentList : function (callback) {
		return connection.query("SELECT * FROM DEPARTMENT", callback);
	},

	positionList : function (callback) {
		return connection.query("SELECT * FROM POSITION", callback);
	}
};

module.exports = Join; 
