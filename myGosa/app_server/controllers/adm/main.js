/**
 * http://usejsdoc.org/
 */

var users =  require('../../models/adm/users');
var bcrypt = require('bcrypt-nodejs');

module.exports.index = function(req, res){
	res.render('adm/index', { title : '관리자 로그인' } ); 	//그릴 페이지, 보낼 객체 
};

module.exports.main = function(req, res){
	res.render('adm/main/index', { 
		title : '관리자 로그인',
		userInfo : req.user				//세션 정보
	}); 	//그릴 페이지, 보낼 객체 
};

