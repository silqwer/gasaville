/**
 * http://usejsdoc.org/
 */

var periods =  require('../../models/adm/periods');
var apply =  require('../../models/adm/apply');

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

module.exports.insertPage = (req, res) =>{
	let page = req.params.page; 
	
	periods.schedule(function(err, rows){
		let schedule = rows;
		
		periods.exam(function(err, rows){
			res.render('adm/periods/insert', { 
				'title' : '기수 등록',
				'userInfo' : req.user, 
				'page' : page, 
				'schedule' : schedule, 
				'exam' : rows
			});
		});
	});
};

module.exports.insert = (req, res) => {
	
	let arr = req.body.ARR;
	let jsonString = arr.replace(/'/g, "\"");
	let jsonPeriod = JSON.parse(jsonString);
	
	for(let i=0; i<jsonPeriod.length; ++i){
		
		periods.insert(jsonPeriod[i], function(err, rows){
			if (err) {
				console.error(err);
				throw err;
			}
		});
	}
	
	res.redirect('/admin/periods/list/1');
	
};

module.exports.updatePage = (req, res) => {
	let page = req.params.page; 
	let seq = req.params.seq; 
	
	periods.selected_periods(seq, function(err, rows){
		let period = rows[0];
	
		periods.selected_schedule(seq, function(err, rows){
			let schedule = rows;
			
			periods.selected_exam(seq, function(err, rows){
		
				res.render('adm/periods/update', { 
					'title' : '기수 수정',
					'userInfo' : req.user, 
					'page' : page, 
					'schedule' : schedule,
					'selected_schedule_seq' : seq, 
					'selected_schedul_name' : period.SCHEDULE_NAME,
					'exam' : rows
				});
			});
		});
	});
	
	
	
};

module.exports.checkApply = (req, res) => {
	
	let seq = req.body.SCHEDULE_SEQ;
	
	periods.countApply(seq, function(err, rows){
		
		if (err) {
			console.error(err);
			throw err;
		}
		
		if(rows[0] > 0){
			res.send({
				'result': false, 
				'seq': seq
			});
		}else{
			res.send({
				'result': true, 
				'seq': seq
			});
		}
	});
	
};

module.exports.update = (req, res) =>{
	
	let page = req.body.PAGE; 
	let seq = req.body.SCHEDULE_SEQ; 
	let arr = req.body.ARR;
	let jsonString = arr.replace(/'/g, "\"");
	let jsonPeriod = JSON.parse(jsonString);
	
	apply.delete(seq, function(err, rows){
		
		periods.delete(seq, function(err, rows){
			
			for(let i=0; i<jsonPeriod.length; ++i){
				
				periods.insert(jsonPeriod[i], function(err, rows){
					if (err) {
						console.error(err);
						throw err;
					}
					
				});
			}
			
			res.redirect('/admin/periods/list/'+page);
		});
	});
};

module.exports.delete = (req, res) => {
	let page = req.body.PAGE; 
	let seq = req.body.SCHEDULE_SEQ; 
	
	apply.delete(seq, function(err, rows){
		
		periods.delete(seq, function(err, rows){
			
			res.redirect('/admin/periods/list/'+page);
		});
	});
	
	
};





