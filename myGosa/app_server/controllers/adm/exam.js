/**
 * http://usejsdoc.org/
 */

var exam =  require('../../models/adm/exam');

//고사장 관리  
module.exports.exam = function(req, res){
	res.redirect('/admin/exam/list/1');
};

module.exports.listPage = function(req, res){
	
	exam.count(function(err, rows){
		var page = req.params.page;
		page = parseInt(page, 10);					// 십진수 만들기 
		var size = 10; 								// 한 페이지에 보여줄 개수		
		var begin = (page - 1) * size;				// 시작 번호
		var cnt = rows[0].CNT;						// 전체 글 개수 
		var totalPage = Math.ceil(cnt / size);		// 전체 페이지 수 
		var pageSize = 10;							// 페이지 링크 갯수 
		
		var startPage = Math.floor((page-1) / pageSize) * pageSize + 1;
		var endPage = startPage + (pageSize - 1);
		
		if(endPage > totalPage){
			endPage = totalPage;
		}
		
		var max = cnt - ((page-1) * size);			// 전체 글이 존재하는 개수
		
		exam.list(begin, size, function(err, rows){
			res.render('adm/exam/list', { 
				'title' : '고사장 관리',
				'userInfo' : req.user,
				'list' : rows, 
				'page' : page, 
				'pageSize' : pageSize,
				'startPage' : startPage,
				'endPage' : endPage,
				'totalPage' : totalPage,
				'max' : max
			}); 
		});
	});
};

module.exports.readPage = function(req, res){
	var page = req.params.page; 
	var seq = req.params.seq; 
	
	exam.read(seq, function(err, rows){
	
		res.render('adm/exam/read', { 
			'title' : '고사장 관리',
			'userInfo' : req.user,
			'exam' : rows[0], 
			'page' : page
		}); 
	});
};

module.exports.updatePage = function(req, res){
	var page = req.params.page; 
	var seq = req.params.seq; 
	
	exam.read(seq, function(err, rows){
	
		res.render('adm/exam/update', { 
			'title' : '고사장 관리',
			'userInfo' : req.user,
			'exam' : rows[0], 
			'page' : page
		}); 
	});
};

module.exports.update = function(req, res){
	var page = req.body.PAGE; 
	
	var params = {
			'seq': req.body.SEQ, 
			'name': req.body.NAME, 
			'school': req.body.SCHOOL,
			'addr': req.body.ADDR
	}
	
	exam.update(params, function(err, rows){
		res.redirect('/admin/exam/list/'+page);
	});
};





