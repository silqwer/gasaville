/**
 * http://usejsdoc.org/
 */

var exam =  require('../../models/adm/exam');

//고사장 관리  
module.exports.exam = (req, res) =>{
	res.redirect('/admin/exam/list/1');
};

module.exports.listPage = (req, res) => {
	
	exam.count(function(err, rows){
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

module.exports.readPage = (req, res) => {
	let page = req.params.page; 
	let seq = req.params.seq; 
	
	exam.read(seq, function(err, rows){
	
		res.render('adm/exam/read', { 
			'title' : '고사장 관리',
			'userInfo' : req.user,
			'exam' : rows[0], 
			'page' : page
		}); 
	});
};

module.exports.updatePage = (req, res) => {
	let page = req.params.page; 
	let seq = req.params.seq; 
	
	exam.read(seq, function(err, rows){
	
		res.render('adm/exam/update', { 
			'title' : '고사장 관리',
			'userInfo' : req.user,
			'exam' : rows[0], 
			'page' : page
		}); 
	});
};

module.exports.insertPage = (req, res) =>{
	let page = req.params.page; 
	
	res.render('adm/exam/insert', { 
		'title' : '고사장 등록',
		'userInfo' : req.user, 
		'page' : page
	});
};

module.exports.insert = (req, res) => {
	 
	let params = {
			'name': req.body.NAME, 
			'school': req.body.SCHOOL, 
			'addr': req.body.ADDR
	};
	
	exam.insert(params, function(err, rows){
		if (err) {
			console.error(err);
			throw err;
		}

		res.redirect('/admin/exam/list/1');
	});
	
};

module.exports.update = (req, res) =>{
	let page = req.body.PAGE; 
	let params = {
			'seq': req.body.SEQ, 
			'name': req.body.NAME, 
			'school': req.body.SCHOOL,
			'addr': req.body.ADDR
	};
	
	exam.update(params, function(err, rows){
		res.redirect('/admin/exam/list/'+page);
	});
};

module.exports.delete = (req, res) => {
	let page = req.body.PAGE; 
	let seq = req.body.SEQ; 
	
	exam.delete(seq, function(err, rows){
		res.redirect('/admin/exam/list/'+page);
	});
};





