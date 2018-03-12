/**
 * http://usejsdoc.org/
 */

var users =  require('../../models/adm/users');
var bcrypt = require('bcrypt-nodejs');
var schedule =  require('../../models/adm/schedule');
var periods =  require('../../models/adm/periods');

//메인 
module.exports.index = (req, res) => {
	res.render('adm/index', { title : '관리자 로그인' } ); 	//그릴 페이지, 보낼 객체 
};

//관리자 홈
module.exports.main = (req, res) => {
	res.render('adm/main/index', { 
		title : '관리자 로그인',
		userInfo : req.user				//세션 정보
	}); 	
};

//일정 관리 
module.exports.schedule = (req, res) => {
	
	schedule.list(function(err, rows){
		if (err) {
			console.error(err);
			throw err;
		}
		
		res.render('adm/schedule/list', { 
			'title': '일정 관리',
			'userInfo': req.user, 
			'list': rows
		}); 
	});

};

//신청 관리   
module.exports.request = (req, res) => {
	res.render('adm/index', { 
		title : '신청 관리',
		userInfo : req.user	
	}); 	
};

//회원 관리   
module.exports.users = (req, res) => {
	res.render('adm/index', { 
		title : '회원 관리',
		userInfo : req.user	
	}); 	
};

//부서 관리   
module.exports.department = (req, res) => {
	res.render('adm/index', { 
		title : '부서 관리 ',
		userInfo : req.user	
	}); 	
};

//공지 관리   
module.exports.notice = (req, res) => {
	res.render('adm/index', { 
		title : '공지 관리',
		userInfo : req.user	
	}); 	
};



