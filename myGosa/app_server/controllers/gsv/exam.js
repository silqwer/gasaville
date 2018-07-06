var exam =  require('../../models/gsv/exam');

//출석고사 고사장 후기 목록
module.exports.hstList = (req, res) => {
	let examSeq = req.params.exam;
	res.redirect('/gsv/main/exam/history/list/'+examSeq+'/1');
};

//고사장 참여이력 관리 리스트 페이지 
module.exports.hstListPage = (req, res) => {
	
	let page = req.params.page;
	let examSeq = req.params.exam;
	
	exam.hstCount(examSeq, function(err, rows){
		
		let result = false;
		
		if(rows === undefined){
			//조회 결과 없음 
			res.render('gsv/exam/list', { 
				'title' : '고사장 참여이력',
				'userInfo' : req.user,
				'page' : page,
				'result' : result
			});
		
			return;
		
		}else{
			result = true;
		}
		page = parseInt(page, 10);					// 십진수 만들기 
		let size = 5; 								// 한 페이지에 보여줄 개수		
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
		
		exam.hstList(examSeq, begin, size, function(err, rows){
			
			if (err) {
				console.error(err);
				throw err;
			}
			
			res.render('gsv/exam/list', { 
				'title' : '고사장 참여이력',
				'userInfo' : req.user,
				'list' : rows, 
				'page' : page, 
				'pageSize' : pageSize,
				'startPage' : startPage,
				'endPage' : endPage,
				'totalPage' : totalPage,
				'max' : max,
				'exam' : examSeq,
				'result' : result
			}); 
		});
	});
};

//참여이력
module.exports.selectApply = (req, res) => {
	
	let examSeq = req.body.examSeq;
	let userSeq = req.user.SEQ;
	
	exam.selectApply(examSeq, userSeq, function(err, rows){
		if (err) {
			console.error(err);
			throw err;
		}
		
		res.send({
			applySeq : rows[0].APPLY_SEQ
		});
		
	});
};

//출석고사 고사장 후기 등록
module.exports.InsertComment = (req, res) => {
	
	let examSeq = req.body.examSeq;
	let applySeq = req.body.applySeq;
	let contents = req.body.contents;
	let userSeq = req.user.SEQ;
	let params = {
		'examSeq':examSeq,
		'applySeq':applySeq,
		'contents':contents,
		'userSeq':userSeq,
	};
	
	exam.InsertComment(params, function(err, rows){
		
		if (err) {
			console.error(err);
			throw err;
		}
		
		res.send({
			result : true
		});
		
	});
};



//출석고사 고사장 후기 목록
module.exports.cmtList = (req, res) => {
	let examSeq = req.params.exam;
	res.redirect('/gsv/main/exam/comment/list/'+examSeq+'/5');
};


//고사장 후기 리스트 페이지 
module.exports.cmtListPage = (req, res) => {
	
	let size = Number(req.params.size);			// 한 페이지에 보여줄 개수		
	let examSeq = req.params.exam;
	
	exam.cmtCount(examSeq, function(err, rows){
		
		let result = false;
		
		if(rows === undefined){
			
			//조회 결과 없음 
			res.render('gsv/exam/cmtList', { 
				'title' : '고사장 후기',
				'userInfo' : req.user,
				'page' : page,
				'result' : result
			});
		
			return;
		
		}else{
			result = true;
		}
	
		let begin = 0;				// 시작 번호
	
		exam.cmtList(examSeq, begin, size, function(err, rows){
			
			if (err) {
				console.error(err);
				throw err;
			}
			
			res.render('gsv/exam/cmtList', { 
				'title' : '고사장 참여이력',
				'userInfo' : req.user,
				'list' : rows, 
				'size' : size, 
				'exam' : examSeq,
				'result' : result
			}); 
		});
	});
};

//고사장 후기 리스트 페이지 더 가져오기  
module.exports.cmtListMore = (req, res) => {
	
	let page = req.body.page;
	let examSeq = req.body.exam;
	
	exam.cmtCount(examSeq, function(err, rows){
		
		let result = false;
		
		if(rows === undefined){
			
			//조회 결과 없음 
			res.render('gsv/exam/cmtList', { 
				'title' : '고사장 후기',
				'userInfo' : req.user,
				'page' : page,
				'result' : result
			});
		
			return;
		
		}else{
			result = true;
		}
	
		page = parseInt(page, 10);					// 십진수 만들기 
		let size = 5; 								// 한 페이지에 보여줄 개수		
		let begin = (page - 1);						// 시작 번호
		
		exam.cmtList(examSeq, begin, size, function(err, rows){
			
			if (err) {
				console.error(err);
				throw err;
			}
			
			res.send({
				'result': true, 
				'list' : rows,
				'userInfo' : req.user,
				'page' : page, 
				'exam' : examSeq,
			});
			
		});
	});
};


