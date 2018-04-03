/**
 * http://usejsdoc.org/
 */

var apply =  require('../../models/adm/apply');
var schedule =  require('../../models/adm/schedule');
var exam = require('../../models/adm/exam');

//신청 관리  
module.exports.apply = (req, res) =>{
	res.redirect('/admin/apply/list/1');
};

module.exports.listPage = (req, res) => {
	
	let page = req.params.page;
	let scheduleSeq = req.params.schedule;
	let category = req.params.category;
	let word = req.params.word;
	
	console.log('=====>');
	console.log(scheduleSeq);
	
	apply.count(scheduleSeq, category, word, function(err, rows){
		
		let result = false;
		
		if(rows === undefined){
			//조회 결과 없음 
			res.render('adm/apply/list', { 
				'title' : '신청 관리',
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
		console.log('카운터:'+cnt);
		let startPage = Math.floor((page-1) / pageSize) * pageSize + 1;
		let endPage = startPage + (pageSize - 1);
		
		if(endPage > totalPage){
			endPage = totalPage;
		}
		
		let max = cnt - ((page-1) * size);			// 전체 글이 존재하는 개수
		         
		apply.list(scheduleSeq, category, word, begin, size, function(err, rows){
			
			let list = rows;
			
			if (err) {
				console.error(err);
				throw err;
			}
			
			let search = '';
			
			if(word !== undefined){
				search = category + '/' + word;
			}
			
			
			schedule.list(function(err, rows){
				
				if (err) {
					console.error(err);
					throw err;
				}
				
				if(scheduleSeq === undefined){
					scheduleSeq = rows[0].SEQ;
				}
				
				console.log('=====>scheduleSeq:'+scheduleSeq);
				
				res.render('adm/apply/list', { 
					'title' : '신청 관리',
					'userInfo' : req.user,
					'list' : list,
					'schList': rows,
					'schedule' : scheduleSeq,
					'page' : page, 
					'pageSize' : pageSize,
					'startPage' : startPage,
					'endPage' : endPage,
					'totalPage' : totalPage,
					'max' : max,
					'category' : category,
					'word' : word,
					'search' : search,
					'result' : result
				}); 
			});
		});
	});
};

//신청 통계 stats
module.exports.stats = (req, res) => {
	
	res.render('adm/apply/stats', { 
		'title' : '신청 관리 통계',
		'userInfo' : req.user
	}); 
};

module.exports.closs = (req, res) => {
	
	res.render('adm/apply/closs', { 
		title : '고사장 마감 통계',
		userInfo : req.user				//세션 정보
	}); 	
	
};

module.exports.best = (req, res) => {
	
	apply.best(function(err, rows){
		
		if (err) {
			console.error(err);
			throw err;
		}
		
		res.render('adm/apply/best', { 
			'list': rows,
			'title': '가장 신청 마감이 빠른 고사장'
		}); 
		
	});
	
};

module.exports.worst = (req, res) => {
	
	apply.worst(function(err, rows){
		
		if (err) {
			console.error(err);
			throw err;
		}
		
		res.render('adm/apply/worst', { 
			'list': rows,
			'title': '가장 신청 마감이 늦은 고사장'
		}); 
		
	});
	
};

module.exports.visit = (req, res) => {
	
	exam.allLists(function(err, rows){
		res.render('adm/apply/visit', { 
			title : '고사장 마감 통계',
			userInfo : req.user,				//세션 정보
			examList : rows
		}); 
	});
	
};

module.exports.visitPage = (req, res) => {
	
	let seq = req.params.seq;
	
	exam.read(seq, function(err, rows){
		
		if (err) {
			console.error(err);
			throw err;
		}
		
		let examName = rows[0].NAME;
		
		apply.visit(seq, function(err, rows){
			
			if (err) {
				console.error(err);
				throw err;
			}
			
			res.render('adm/apply/visitPage', { 
				'list': rows,
				'examName' : examName, 
				'title': examName + ' 신청수 '
			}); 
		});
	});
};


module.exports.accrue = (req, res) => {
	
	schedule.dateList(function(err, rows){
		res.render('adm/apply/accrue', { 
			title : '고사장 마감 통계',
			userInfo : req.user,				//세션 정보
			list : rows
		}); 
	});
};

module.exports.accruePage = (req, res) => {
	
	let date = req.params.seq;
	
	apply.accrue(date, function(err, rows){
		
		if (err) {
			console.error(err);
			throw err;
		}
		
		res.render('adm/apply/accruePage', { 
			'list' : rows,
			'title' : date + ' 년 출석고사 참여횟수  ',
			'date' : date
		}); 
	});
};

module.exports.user = (req, res) => {

	apply.userList(function(err, rows){
		res.render('adm/apply/user', { 
			title : '개일별 참석 고사장 비율',
			userInfo : req.user,				//세션 정보
			list : rows
		}); 
	});
};

module.exports.userPage = (req, res) => {
	
	let seq = req.params.seq;
	
	apply.sum(seq, function(err, rows){
		
		if (err) {
			console.error(err);
			throw err;
		}
		
		let sum = rows[0].SUM;
		let name = rows[0].NAME;
		
		apply.examRate(sum, seq, function(err, rows){
			res.render('adm/apply/userPage', { 
				'list' : rows,
				'title' : name + ' 참석 고사장 비율',
				'name' : name
			}); 
		});
	});
};
