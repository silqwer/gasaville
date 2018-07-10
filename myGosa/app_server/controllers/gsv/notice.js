var notice =  require('../../models/gsv/notice');

module.exports.list = (req, res) => {
	res.redirect('/gsv/notice/list/1');
};

module.exports.listPage = (req, res) => {
	let page = req.params.page;
	
	notice.count(function(err, rows){
		
		let result = false;
		
		if(rows === undefined){
			//조회 결과 없음 
			res.render('gsv/notice/list', { 
				'title' : '공지사항',
				'userInfo' : req.user,
				'page' : page, 
				'result' : result
			});
		
			return;
		
		}else{
			result = true;
		}
		
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
			
			res.render('gsv/index', { 
				'body': 'notice/list',
				'title' : '공지사항',
				'userInfo' : req.user,
				'list' : rows, 
				'page' : page, 
				'pageSize' : pageSize,
				'startPage' : startPage,
				'endPage' : endPage,
				'totalPage' : totalPage,
				'max' : max,
				'result' : result
			}); 
		});
	});
};

module.exports.viewPage = (req, res) => {
	let list = req.params.page;
	let view = req.params.view;
	let record = null;

	notice.view(view, function(err, rows) {
		if(err) {
			console.log(err);
			throw err;
		}

		record = rows;

		notice.getNearRecored(view, function(err, rows) {
			res.render('gsv/index', {
				body: 'notice/view',
				list : list,
				nearRecord: rows,
				content: record
			});
		});
	});
}
