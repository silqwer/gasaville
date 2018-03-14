/**
 * http://usejsdoc.org/
 */

var department =  require('../../models/adm/department');

//신청 관리  
module.exports.department = (req, res) =>{
	
	res.redirect('/admin/department/list/1');
};

module.exports.listPage = (req, res) => {
	
	department.count(function(err, rows){
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
		
		department.list(begin, size, function(err, rows){
			
			if (err) {
				console.error(err);
				throw err;
			}
			
			res.render('adm/department/list', { 
				'title' : '부서 관리',
				'userInfo' : req.user,
				'list' : list,
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






