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
	router.get('/main', ctrlMain.main);
	
	router.post('/login', passport.authenticate('local-login', {
		successRedirect : '/admin/main',
		failureRedirect : '/admin/login',
		failureFlash : true
	}),ctrlMain.login);
	
	return router;
};
