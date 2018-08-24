/**
 * http://usejsdoc.org/
 */

var users =  require('../../models/adm/users');
var schedule =  require('../../models/adm/schedule');
var periods =  require('../../models/adm/periods');

//메인 
module.exports.index = (req, res) => {
	res.render('adm/index', { title : '관리자 로그인', msg:'' } ); 	//그릴 페이지, 보낼 객체 
};

//로그인실패
module.exports.loginFail = (req, res) => {
	res.render('adm/index', { title : '관리자 로그인', msg:'아이디와 비밀번호를 다시 확인해 주세요.' } ); 	//그릴 페이지, 보낼 객체 
};

//로그아웃
module.exports.logout = (req, res) => {
	req.logout();
	res.redirect('/admin');
};

//관리자 홈
module.exports.main = (req, res) => {
	res.render('adm/main/index', { 
		title : '메인',
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


