/**
 * http://usejsdoc.org/
 */

const periods =  require('../../models/adm/periods');
const apply =  require('../../models/adm/apply');
const multer = require('multer');			//파일업로드 프레임워크? 
const storage = multer.diskStorage({		//업로드 파일 경로 설정 
	destination: function (req, file, cb) {
		cb(null, 'public/adm/excel/');	//콜백함수를 통해 전송된 파일을 저장할 디렉토리 설정 
	}, 
	
	filename: function(req, file, cb) {
		cb(null, file.originalname);	//콜백함수를 통해 전송된 파일 이름을 설정 
	}
});

//기수 관리  
module.exports.periods = (req, res) =>{
	res.redirect('/admin/periods/list/1');
};

module.exports.listPage = (req, res) => {
	
	let page = req.params.page;
	let word = req.params.word;
	
	periods.count(word, function(err, rows){
		
		if(rows === undefined){
			//조회 결과 없음 
			res.render('adm/periods/list', { 
				'title' : '기수 관리',
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
		
		periods.list(word, begin, size, function(err, rows){
			
			if (err) {
				console.error(err);
				throw err;
			}
			
			let search = '';
			
			if(word !== undefined){
				search = '/' + word;
			}
			
			
			res.render('adm/periods/list', { 
				'title' : '기수 관리',
				'userInfo' : req.user,
				'list' : rows, 
				'page' : page, 
				'pageSize' : pageSize,
				'startPage' : startPage,
				'endPage' : endPage,
				'totalPage' : totalPage,
				'max' : max,
				'word' : word,
				'search' : search,
				'result' : result
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
		let examClass = jsonPeriod[i].examClass;
		for(let j=0; j<examClass; ++j){
			let period = {
					'schSeq' : jsonPeriod[i].schSeq,
					'examSeq' : jsonPeriod[i].examSeq,
					'examClass' : j+1
			};
			
			periods.insert(period, function(err, rows){
				if (err) {
					console.error(err);
					throw err;
				}
			});
		}
		
	}
	
	res.redirect('/admin/periods/list/1');
	
};

module.exports.updatePage = (req, res) => {
	let page = req.params.page; 
	let seq = req.params.seq; 
	
	periods.selected_periods(seq, function(err, rows){
		let schedule = rows[0];
	
		periods.selected_exam(seq, function(err, rows){
			
			res.render('adm/periods/update', { 
				'title' : '기수 수정',
				'userInfo' : req.user, 
				'page' : page, 
				'schedule' : schedule,
				'selected_schedule_seq' : seq, 
				'selected_schedul_name' : schedule.SCHEDULE_NAME,
				'exam' : rows
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

//기수 엑셀 등록 페이지 uploadPage
module.exports.uploadPage = (req, res) => {
	
	periods.schedule(function(err, rows){
		let schedule = rows;
		
		res.render('adm/periods/excel', { 
			'title' : '기수 엑셀 등록',
			'userInfo' : req.user, 
			'schedule' : schedule
		}); 
	});
};


//기수 엑셀 등록 페이지 uploadPage
module.exports.upload = (req, res, next) => {
	
	
	let upload = multer({
		storage:storage, 				//저장경로
		fileFilter : function(req, file, callback){		//파일필터
			
			if(['xls', 'xlsx'].indexOf(file.originalname.split('.')[file.originalname.split('.').length-1]) === -1){
				return callback(new Error('Wrong extension type'));
			}
			callback(null, true);
		}
	}).single('excel');
	
	let excelToJson = null;										// 엑셀파일을 json파일로 변환해주는 모듈을 넣을 변수 
	let uploadResult = true; 									// 엑셀 업로드 결과 
	let msg = '엑셀파일을 통한 기수 등록을 완료했습니다.';		// 엑셀 업로드 결과 메세지 
	
	//파일 삭제 함수
	let fileDelete = function(path){
		let fs = require('fs');
		
		try {
			fs.unlinkSync(path);
		} catch (e) {
			// TODO: handle exception
			console.log('error deleting the file'); 
			
		}
	}; 
	

	upload(req, res, function(err){
		
		if(err){
			msg = '엑셀 파일 업로드 서버 에러입니다. 담당 개발자에게 문의해주세요. ['+err+']';
			
			//결과 페이지로 
			resRender(req, res, msg, false); 
		}
		
		if(!req.file){
			msg = '엑셀 파일이 서버로 전송되지 않았습니다.  담당 개발자에게 문의해주세요. ';
			
			//결과 페이지로 
			resRender(req, res, msg, false); 
		}
		
		//엑셀 파일 컨버팅 시작, 엑셀 > Json
		if(req.file.originalname.split('.')[req.file.originalname.split('.').length-1] === 'xlsx'){
			//파일 확장자를 통해서 구분 
			excelToJson = require('xlsx-to-json-lc'); 
		}else{
			excelToJson = require('xls-to-json-lc'); 
		}

		try{
			excelToJson({
				input: req.file.path, 			//엑셀 파일이 업로드 된 경로 
				output: null,					//Json 파일이 저장될 경로 
				lowerCaseHeaders: true
			}, function(err, result){
				
				if(err){
					msg = '엑셀파일에 데이터가 없습니다. 확인 후 다시 시도해주세요.['+err+']';
					return res.json({'result':false, 'msg':msg});
				}
				
				let length = result.length; 
				let scheduleSeq  = req.body.scheduleCategory;
				for(let i=0; i<length; ++i){
					let exam = {
						'regionName': result[i].지역, 
						'schoolName': result[i].학교,
						'classNum': result[i].반수 
					};
					
					if(exam.regionName === undefined){
						msg = '엑셀파일에 입력된 고사장의 지역 정보가 없습니다. 엑셀파일의 데이터를 확인 후 다시 시도해주세요.';
						return res.json({'result':false, 'msg':msg});
					}
					
					if(exam.schoolName === undefined){
						msg = '엑셀파일에 입력된 고사장의 학교 정보가 없습니다. 엑셀파일의 데이터를 확인 후 다시 시도해주세요.';
						return res.json({'result':false, 'msg':msg});
					}
					
					if(exam.classNum === undefined){
						msg = '엑셀파일에 입력된 고사장의 반수 정보가 없습니다. 엑셀파일의 데이터를 확인 후 다시 시도해주세요.';
						return res.json({'result':false, 'msg':msg});
					}
					
					if(exam.classNum <= 0){
						msg = '엑셀파일에 입력된 고사장의 반수 정보가 없습니다. 엑셀파일의 데이터를 확인 후 다시 시도해주세요.';
						return res.json({'result':false, 'msg':msg});
					}
					
					//시험장 읽어오기
					periods.readSeq(exam, function(err, rows){
						
						if(rows[0] === undefined){
							//여기서 바로 고사장 정보를 입력하고 일정도 등록한다. 
							let params = {
									'name':exam.regionName,
									'school':exam.schoolName,
									'addr':''
							};
							
							periods.insertExam(params ,function(err, rows){
								if (err) {
									msg = '엑셀파일에 데이터가 없습니다. 확인 후 다시 시도해주세요.['+err+']';
									return res.json({'result':false, 'msg':msg});
								}
							})
							
							periods.readSeq(exam, function(err, rows){
								//일정 등록하기
								let examNum = Number(exam.classNum);
								for(let i=0; i<examNum; ++i){
									let period = {
										'schSeq': Number(scheduleSeq), 
										'examSeq': rows[0].SEQ, 
										'examNum': Number(exam.classNum),
										'examClass': i+1
									}; 
									
									periods.insert(period, function(err, rows){
										if (err) {
											msg = '엑셀파일에 데이터가 없습니다. 확인 후 다시 시도해주세요.['+err+']';
											return res.json({'result':false, 'msg':msg});
										}
									});
								}
							});
							
						}else{
							//일정 등록하기
							let examNum = Number(exam.classNum);
							for(let i=0; i<examNum; ++i){
								let period = {
									'schSeq': Number(scheduleSeq), 
									'examSeq': rows[0].SEQ, 
									'examNum': Number(exam.classNum),
									'examClass': i+1
								}; 
								
								periods.insert(period, function(err, rows){
									if (err) {
										msg = '엑셀파일에 데이터가 없습니다. 확인 후 다시 시도해주세요.['+err+']';
										return res.json({'result':false, 'msg':msg});
									}
								});
							}
						}
					});
				}
				
				msg = '엑셀파일 등록을 완료했습니다.';
				return res.json({'result':true, 'msg':msg});
			});
			
		} catch (e) {
			msg = '손상된 엑셀파일입니다. 엑셀파일을 다시 생성해서 시도해주세요.['+e+']';
			return res.json({'result':false, 'msg':msg});
		}
	});

};


