/**
 * http://usejsdoc.org/
 */

var users =  require('../models/users');

module.exports.index = function(req, res){
	var data; 
	
	//모델을 이용해서 쿼리를 날리는 부분 
	users.all(function(error, results){
		console.log(results);	//쿼리 결과값 콘솔 로그 직기 
		res.render('users', {userList:results} );// 그릴 페이지 , 보낼 객체? 결과? 
	});
	
};

/*module.exports.index = function(req, res){
	res.render('index', { title : 'dddddddd' } );
};*/

/*router.get('/:id?',function(req,res,next){
	if(req.params.id){
		Task.getTaskById(req.params.id,function(err,rows){
			if(err){
				res.json(err);
			}else{
				res.json(rows);
			}
		});
	}else{
		Task.getAllTasks(function(err,rows){
			if(err){
				res.json(err);
			}else{
				res.json(rows);
			}
		});
	}
});*/