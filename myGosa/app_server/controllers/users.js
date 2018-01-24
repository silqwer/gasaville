/**
 * http://usejsdoc.org/
 */

var users =  require('../models/users');

module.exports.index = function(req, res){
	var data; 
	users.all(function(error, results){
		console.log(results);
		res.json(results);
	});
	console.log('data:'+data.toString());
	res.render('users', {users:data} );// 그릴 페이지 , 보낼 객체? 결과? 
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