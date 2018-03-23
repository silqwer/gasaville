/**
 * http://usejsdoc.org/
 */

var notice =  require('../../models/adm/notice');

//공지사항 관리  
module.exports.notice = (req, res) =>{
	res.redirect('/admin/notice/list/1');
};

//공지사항 관리 리스트 페이지 
module.exports.listPage = (req, res) => {
	
	notice.count(function(err, rows){
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
		
		notice.list(begin, size, function(err, rows){
			
			if (err) {
				console.error(err);
				throw err;
			}
			
			res.render('adm/notice/list', { 
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

module.exports.insertPage = (req, res) =>{
	let page = req.params.page; 
	
	res.render('adm/notice/insert', { 
		'title' : '공지사항 등록',
		'userInfo' : req.user, 
		'page' : page
	});
};

module.exports.insert = (req, res) => {
	 
	let params = {
			'startDate': req.body.START_DATE, 
			'endDate': req.body.END_DATE, 
			'title': req.body.TITLE, 
			'contents': req.body.CONTENTS,
	};
	
	notice.insert(params, function(err, rows){
		if (err) {
			console.error(err);
			throw err;
		}

		res.redirect('/admin/notice/list/1');
	});
	
};

module.exports.updatePage = (req, res) => {
	let page = req.params.page; 
	let seq = req.params.seq; 
	
	notice.upDown(seq, function (err, rows) {
		if (err) {
			console.error(err);
			throw err;
		}
		
		let pre = null;
		let next = null;
		
		if(rows[0] !== undefined){
			pre = rows[0];
		}
		
		if(rows[1] !== undefined){
			next = rows[1];
		}
		
		notice.read(seq, function(err, rows){
			if (err) {
				console.error(err);
				throw err;
			}
			res.render('adm/notice/update', { 
				'title' : '공지사항 관리',
				'userInfo' : req.user,
				'notice' : rows[0], 
				'pre' : pre, 
				'next' : next, 
				'page' : page
			}); 
		});
	});
	
};

module.exports.update = (req, res) =>{
	let page = req.body.PAGE; 
	let params = {
			'startDate': req.body.START_DATE, 
			'endDate': req.body.END_DATE, 
			'title': req.body.TITLE, 
			'contents': req.body.CONTENTS,
			'seq' : req.body.SEQ
	};
	
	notice.update(params, function(err, rows){
		
		if (err) {
			console.error(err);
			throw err;
		}
		
		res.redirect('/admin/notice/list/'+page);
	});
};

module.exports.delete = (req, res) => {
	let page = req.body.PAGE; 
	let seq = req.body.SEQ; 

	notice.delete(seq, function(err, rows){
		
		if (err) {
			console.error(err);
			throw err;
		}
		
		
		res.redirect('/admin/notice/list/'+page);
	});
};

