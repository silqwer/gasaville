/**
 * 데이터 베이스 접속 정보 
 */

var mysql = require('mysql');
var config = require('./db_info.js').real; // ./ 같은 폴더에 있음을 의미 

module.exports = function (){
	return {
		init: function(){
			return mysql.createConnection({
				host: config.host,
				port: config.port,
				user: config.user,
				password: config.password,
				database: config.database
			});
		}, 
		test: function(con){
			con.connect(function(err){
				if(err){
					console.error('mysql connection error : '+ err);
				}else{
					console.info('mysql is connected successfully.');
				}
			});
		}
		
	};
};