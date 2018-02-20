var express = require('express');
var router = express.Router();
var ctrlMain = require('../../controllers/adm/main');

/*router.get('/', ctrlMain.index);
router.get('/login', ctrlMain.index);
							   
router.post('/login', passport.authenticate('local-login', {
	successRedirect : 'adm/main/index',
	failureRedirect : '/login',
	failureFlash : true
}),ctrlMain.login);*/

//module.exports = router;

module.exports = function (passport){
	router.get('/', ctrlMain.index);
	router.get('/login', ctrlMain.index);
	
	var ensureAuthenticated = function (req, res, next){
		// 로그인이 되어 있으면, 다음 파이프라인으로 진행

	    if (req.isAuthenticated()) { return next(); }

	    // 나중에 관리자 권한 확인하고 접근 분리하도록 진행 
	    
	    // 로그인이 안되어 있으면, login 페이지로 진행
	    res.redirect('/admin/login');

	};
	
	router.get('/main', ensureAuthenticated, ctrlMain.main);
	
	router.post('/login', passport.authenticate('local-login', {
		successRedirect : '/admin/main',
		failureRedirect : '/admin/login',
		failureFlash : true
	}));
	
	return router;
};
