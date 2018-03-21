/**
 * http://usejsdoc.org/
 */

var comment =  require('../../models/adm/comment');

//고사장 관리  
module.exports.comment = (req, res) =>{
	res.redirect('/admin/comment/list/1');
};

module.exports.listPage = (req, res) => {
	
	comment.count(function(err, rows){
		let page = req.params.page;
		page = parseInt(page, 10);					// 십진수 만들기 
		let size = 10; 								// 한 페이지에 보여줄 개수		
		let begin = (page - 1) * size;				// 시작 번호
		let cnt = rows[0].CNT;						// 전체 글 개수 
		let totalPage = Math.ceil(cnt / size);		// 전체 페이지 수 
		let pageSize = 10;							// 페이지 링크 갯수 
		
		let startPage = Math.floor((page-1) / pageSize) * pageSize + 1;
		let endPage = startPage + (pageSize - 1);
		
		if(endPage > totalPage){
			endPage = totalPage;
		}
		
		let max = cnt - ((page-1) * size);			// 전체 글이 존재하는 개수
		
		comment.list(begin, size, function(err, rows){
			
			if (err) {
				console.error(err);
				throw err;
			}
			
			res.render('adm/comment/list', { 
				'title' : '고사장 후기 관리',
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

module.exports.updatePage = (req, res) => {
	let page = req.params.page; 
	let seq = req.params.seq; 
	let number = req.params.number
	
	comment.read(seq, function(err, rows){
		
		if (err) {
			console.error(err);
			throw err;
		}
		
		res.render('adm/comment/update', { 
			'title' : '고사장 관리',
			'userInfo' : req.user,
			'comment' : rows[0],
			'number' : number, 
			'page' : page
		}); 
	});
};

module.exports.delete = (req, res) => {
	let page = req.body.PAGE; 
	let seq = req.body.SEQ; 
	
	comment.delete(seq, function(err, rows){
		
		if (err) {
			console.error(err);
			throw err;
		}
		
		res.redirect('/admin/comment/list/'+page);
	});
};





