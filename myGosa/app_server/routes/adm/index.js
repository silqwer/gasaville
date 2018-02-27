var express = require('express');
var router = express.Router();
var ctrlMain = require('../../controllers/adm/main');
var ctrlExam = require('../../controllers/adm/exam');

/*router.get('/', ctrlMain.index);
router.get('/login', ctrlMain.index);
							   
router.post('/login', passport.authenticate('local-login', {
	successRedirect : 'adm/main/index',
	failureRedirect : '/login',
	failureFlash : true
}),ctrlMain.login);*/

//module.exports = router;

module.exports = function (passport){
	var ensureAuthenticated = function (req, res, next){
		// 로그인이 되어 있으면, 다음 파이프라인으로 진행

	    if (req.isAuthenticated()) { return next(); }

	    // 나중에 관리자 권한 확인하고 접근 분리하도록 진행 
	    
	    // 로그인이 안되어 있으면, login 페이지로 진행
	    res.redirect('/admin/login');

	};
	
	router.get('/', ctrlMain.index);												// 관리자 메인 
	router.get('/main', ensureAuthenticated, ctrlMain.main);						// 관리자 홈 
	router.get('/login', ctrlMain.index);											// 관리자 로그인 
	router.get('/schedule', ensureAuthenticated, ctrlMain.schedule);				// 일정 관리 
	
	router.get('/exam', ensureAuthenticated, ctrlExam.exam);						// 고사장 관리 
	router.get('/exam/list/:page', ensureAuthenticated, ctrlExam.listPage);				// 고사장 관리 리스트 출력  
	router.get('/exam/read/:page/:seq', ensureAuthenticated, ctrlExam.readPage);		// 고사장 관리 글 읽기 페이지 호출
	router.get('/exam/update/:page/:seq', ensureAuthenticated, ctrlExam.updatePage);	// 고사장 관리 글 수정 페이지 호출 
	router.post('/exam/update', ensureAuthenticated, ctrlExam.update);				// 고사장 관리 글 수정   
	router.post('/exam/delete', ensureAuthenticated, ctrlExam.delete);				// 고사장 관리 글 삭제 
	
	router.get('/periods', ensureAuthenticated, ctrlMain.periods);			// 기수 관리 
	router.get('/request', ensureAuthenticated, ctrlMain.request);			// 신청 관리  
	router.get('/users', ensureAuthenticated, ctrlMain.users);				// 회원 관리 
	router.get('/department', ensureAuthenticated, ctrlMain.department);	// 부서 관리 
	router.get('/notice', ensureAuthenticated, ctrlMain.notice);			// 공지 관리 
	
	
	
	router.post('/login', passport.authenticate('local-login', {
		successRedirect : '/admin/main',
		failureRedirect : '/admin/login',
		failureFlash : true
	}));
	
	return router;
};
