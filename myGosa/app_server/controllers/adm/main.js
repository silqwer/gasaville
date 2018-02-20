/**
 * http://usejsdoc.org/
 */

var users =  require('../../models/adm/users');
var bcrypt = require('bcrypt-nodejs');

module.exports.index = function(req, res){
	res.render('adm/index', { title : '관리자 로그인' } ); 	//그릴 페이지, 보낼 객체 
};

module.exports.main = function(req, res){
	res.render('adm/main/index', { title : '관리자 로그인' } ); 	//그릴 페이지, 보낼 객체 
};


module.exports.login = function(req, res){
	console.log('로그인 이당');
	res.redirect('/');
};
