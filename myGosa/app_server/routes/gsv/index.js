var express = require('express');
var router = express.Router();
var ctrlMain = require('../../controllers/gsv/main');
var ctrlJoin = require('../../controllers/gsv/join');
var ctrlNotice = require('../../controllers/gsv/notice');

module.exports = function (passport){
	var ensureAuthenticated = function (req, res, next){
		// 로그인이 되어 있으면, 다음 파이프라인으로 진행

	    if (req.isAuthenticated()) { return next(); }

	    // 나중에 관리자 권한 확인하고 접근 분리하도록 진행 
	    
	    // 로그인이 안되어 있으면, login 페이지로 진행
	    res.redirect('/');

	};
	
	router.get('/', ctrlMain.index);												// 사용자 로그인 
	router.get('/main', ensureAuthenticated, ctrlMain.main);						// 출석고사 페이지 
	router.get('/logout', ensureAuthenticated, ctrlMain.logout);					// 사용자 로그아웃

	router.get('/join/main', ctrlJoin.main);										// 사용자 회원가입

	router.get('/notice/list', ensureAuthenticated, ctrlNotice.list);				// 공지사항 페이지
	router.get('/notice/list/:page', ensureAuthenticated, ctrlNotice.listPage);		// 공지사항 특정 목록
	router.get('/notice/list/:page/:view', ensureAuthenticated, ctrlNotice.viewPage);// 공지사항 특정 페이지

	//router.post('/join/insert', ctrlJoin.insert);									// 회원가입 insert
	router.post('/join/availableId', ctrlJoin.availableId);							// 아이디 사용 유무
	
	router.post('/main/insertApply', ensureAuthenticated, ctrlMain.insertApply);	// 출석고사 신청정보 insert
	router.post('/main/deleteApply', ensureAuthenticated, ctrlMain.deleteApply);	// 출석고사 신청정보 delete

	//로그인 
	router.post('/', passport.authenticate('local-login', {
		successRedirect : '/gsv/main',
		failureRedirect : '/',
		failureFlash : true
	}));
	
	//회원가입  
	router.post('/join/insert', passport.authenticate('local-signup', {
		successRedirect : '/',
		failureRedirect : '/gsv/join/main',
		failureFlash : true
	}));
	
	return router;
};


