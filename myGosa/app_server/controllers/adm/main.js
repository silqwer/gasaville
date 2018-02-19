/**
 * http://usejsdoc.org/
 */

var users =  require('../../models/adm/users');

module.exports.index = function(req, res){
	res.render('adm/index', { title : '관리자 로그인' } ); 	//그릴 페이지, 보낼 객체 
};

module.exports.login = function(req, res){
	res.render('adm/main/index', { title : '관리자 로그인 성공' } ); 	//그릴 페이지, 보낼 객체 
	/*users.login(function(error, results){
		res.render('adm/main/index', { title : '관리자 로그인' } ); 	//그릴 페이지, 보낼 객체 
	});*/
};
