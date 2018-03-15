/**
 * http://usejsdoc.org/
 */

var users =  require('../../models/adm/users');
var department =  require('../../models/adm/department');
var position =  require('../../models/adm/position');

//신청 관리  
module.exports.users = (req, res) =>{
	
	res.redirect('/admin/users/list/1');
};

module.exports.listPage = (req, res) => {
	
	users.count(function(err, rows){
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
		
		users.list(begin, size, function(err, rows){
			
			if (err) {
				console.error(err);
				throw err;
			}
			
			res.render('adm/users/list', { 
				'title' : '회원 관리',
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

module.exports.updatePage = (req, res) =>{
	let page = req.params.page; 
	let seq = req.params.seq; 
	
	department.allLists(function(err, rows){
		
		if (err) {
			console.error(err);
			throw err;
		}
		
		let departmentList = rows;
		
		position.allLists(function(err, rows){
			
			if (err) {
				console.error(err);
				throw err;
			}
			
			let positionList = rows;

			users.select(seq, function(err, rows){
				if (err) {
					console.error(err);
					throw err;
				}

				res.render('adm/users/update', { 
					'title' : '회원 수정',
					'userInfo' : req.user, 
					'departmentList' : departmentList, 
					'positionList' : positionList, 
					'user' : rows[0],
					'page' : page
				}); 
			});
		});
	});
};

module.exports.delete = (req, res) => {
	let page = req.body.PAGE; 
	let seq = req.body.SEQ; 
	
	users.delete(seq, function(err, rows){
		
		if (err) {
			console.error(err);
			throw err;
		}
		
		res.redirect('/admin/users/list/'+page);
		
	});
};

module.exports.update = (req, res) =>{
	let page = req.body.PAGE; 
	let params = {
			'seq': req.body.SEQ, 
			'name': req.body.NAME, 
			'department': req.body.DEPARTMENT,
			'position': req.body.POSITION,
			'admin': req.body.ADMIN,
			'cellphone': req.body.CELLPHONE
	};
	
	users.update(params, function(err, rows){
		
		if (err) {
			console.error(err);
			throw err;
		}
		
		res.redirect('/admin/users/list/'+page);
	});
};


