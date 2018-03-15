var express = require('express');
var router = express.Router();
var ctrlMain = require('../../controllers/gsv/main');

module.exports = function (passport){
	var ensureAuthenticated = function (req, res, next){
		// 로그인이 되어 있으면, 다음 파이프라인으로 진행

	    if (req.isAuthenticated()) { return next(); }

	    // 나중에 관리자 권한 확인하고 접근 분리하도록 진행 
	    
	    // 로그인이 안되어 있으면, login 페이지로 진행
	    res.redirect('/');

	};
	
	router.get('/', ctrlMain.index);												// 사용자 로그인  
	router.get('/join', ctrlMain.join);												// 사용자 회원가입
	router.get('/main', ensureAuthenticated, ctrlMain.main);						// 사용자 메인화면
	router.get('/logout', ensureAuthenticated, ctrlMain.logout);					// 사용자 로그아웃

	router.post('/', passport.authenticate('local-login', {
		successRedirect : '/gsv/main',
		failureRedirect : '/',
		failureFlash : true
	}));
	
	return router;
};


