/**
 * http://usejsdoc.org/
 */

var periods =  require('../../models/adm/periods');

//기수 관리  
module.exports.periods = (req, res) =>{
	res.redirect('/admin/periods/list/1');
};

module.exports.listPage = (req, res) => {
	periods.count(function(err, rows){
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
		periods.list(begin, size, function(err, rows){
			res.render('adm/periods/list', { 
				'title' : '기수 관리',
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
	
	periods.read(seq, function(err, rows){
	
		res.render('adm/periods/read', { 
			'title' : '고사장 관리',
			'userInfo' : req.user,
			'periods' : rows[0], 
			'page' : page
		}); 
	});
};

module.exports.updatePage = (req, res) => {
	let page = req.params.page; 
	let seq = req.params.seq; 
	
	periods.read(seq, function(err, rows){
	
		res.render('adm/periods/update', { 
			'title' : '고사장 관리',
			'userInfo' : req.user,
			'periods' : rows[0], 
			'page' : page
		}); 
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
	
	periods.update(params, function(err, rows){
		res.redirect('/admin/periods/list/'+page);
	});
};

module.exports.delete = (req, res) => {
	let page = req.body.PAGE; 
	let seq = req.body.SEQ; 
	
	periods.delete(seq, function(err, rows){
		res.redirect('/admin/periods/list/'+page);
	});
};





