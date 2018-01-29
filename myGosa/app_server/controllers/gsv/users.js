/**
 * http://usejsdoc.org/
 */

var users =  require('../../models/gsv/users');

module.exports.index = function(req, res){
	var data; 
	
	//모델을 이용해서 쿼리를 날리는 부분 
	users.all(function(error, results){
		console.log(results);	//쿼리 결과값 콘솔 로그 직기 
		res.render('gsv/users', {userList:results} );// 그릴 페이지 , 보낼 객체? 결과? 
	});
	
};
