/**
 * http://usejsdoc.org/
 */

var users =  require('../../models/adm/users');
var bcrypt = require('bcrypt-nodejs');

//메인 
module.exports.index = function(req, res){
	res.render('adm/index', { title : '관리자 로그인' } ); 	//그릴 페이지, 보낼 객체 
};

//관리자 홈
module.exports.main = function(req, res){
	res.render('adm/main/index', { 
		title : '관리자 로그인',
		userInfo : req.user				//세션 정보
	}); 	
};

//일정 관리 
module.exports.schedule = function(req, res){
	res.render('adm/schedule/list', { 
		title : '일정 관리',
		userInfo : req.user	
	}); 
};

//고사장 관리  
module.exports.exam = function(req, res){
	res.render('adm/index', { 
		title : '고사장 관리',
		userInfo : req.user	
	}); 	
};

//기수 관리   
module.exports.periods = function(req, res){
	res.render('adm/index', { 
		title : '기수 관리',
		userInfo : req.user	
	}); 	
};

//신청 관리   
module.exports.request = function(req, res){
	res.render('adm/index', { 
		title : '신청 관리',
		userInfo : req.user	
	}); 	
};

//회원 관리   
module.exports.users = function(req, res){
	res.render('adm/index', { 
		title : '회원 관리',
		userInfo : req.user	
	}); 	
};

//부서 관리   
module.exports.department = function(req, res){
	res.render('adm/index', { 
		title : '부서 관리 ',
		userInfo : req.user	
	}); 	
};

//공지 관리   
module.exports.notice = function(req, res){
	res.render('adm/index', { 
		title : '공지 관리',
		userInfo : req.user	
	}); 	
};



