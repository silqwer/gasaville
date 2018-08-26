var main =  require('../../models/gsv/main');

module.exports.index = (req, res) => {
	res.render('gsv/index', { 
		body : 'login', 
		msg : ''
	});
};

module.exports.fail = (req, res) => {
	res.render('gsv/index', { 
		body : 'login', 
		msg : '아이디와 비밀번호를 다시 확인해 주세요.'
	});
};

module.exports.main = (req, res) => {
	let schedule = null;
	let listParams = null;

	main.scheduleInfo(function (err, rows) {
		schedule = rows;

		listParams = {
			schedule: schedule[0].SEQ,
			user: req.user.SEQ
		};

		main.list(listParams, function(err, rows) {
			if(err) {
				console.log(err);
				throw err;
			}

			let nowDate 	= new Date();
			let applyDate 	= new Date(schedule[0].APPLY_DATE);
			let applyStatus = null;

			applyStatus = nowDate >= applyDate ? 1 : 0;

			res.render('gsv/index', {
				body : 'main',
				schedule : schedule,
				result: rows,
				applyStatus : applyStatus
			});
		});
	});
};

module.exports.insertApply = (req, res) => {
	let userIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
	
	let params = {
		'period': req.body.period,
		'schedule': req.body.schedule,
		'user': req.user.SEQ,
		'class': req.body.class,
		'ip': userIp
	};
	
	main.checkApply(params, function(err, rows){
		
		if(err) {
			console.log(err);
			throw err;
		}
		
		if(rows[0].CNT > 0) {
			res.send({
				result : false
			});
		}else{
			
			main.possibleInsert(params, function(err, rows) {

				if(err) {
					console.log(err);
					throw err;
				}
				
				if(rows[0].STATUS === 0) {

					main.insertApply(params, function(err, rows) {

						if(err) {
							console.log(err);
							throw err;
						}

						res.send({
							result : true
						});
					});

				} else {
				
					res.send({
						result : false
					});
				}
			});
		}
	});
	
};

module.exports.deleteApply = (req, res) => {
	const user = req.user.SEQ;
	let params  = {
		period: req.body.period,
		schedule: req.body.schedule,
		class: req.body.class
	};

	main.isCorrectUserData(params, function(err, rows) {
		if(rows.length === 0 || rows[0].USER_SEQ !== user) {
			res.send({
				result : false
			});
		}

		params.user = user;

		main.deleteApply(params, function(err, rows) {
			if(err) {
				console.log(err);
				throw err;
			}

			res.send({
				result : true
			});

		});
	});
}


module.exports.download = (req, res) => {
	
	let fn = req.params.fileName;
	console.log('__dirname:'+__dirname); 
	console.log('process.cwd():'+process.cwd()); 
	
	var path = require('path');
	global.appRoot = path.resolve(__dirname);
	console.log('appRoot:'+appRoot); 
	
	res.download(process.cwd()+'\\public\\gsv\\excel\\'+fn);
	
};


module.exports.downloadApply = (req, res) => {
	const user = req.user.SEQ;
	let scheduleSeq = req.body.schedule;
	let name = req.body.name;
	
	main.applyList(scheduleSeq, function(err, rows) {
		
		if (err) {
			console.error(err);
			
			res.send({
				'result' : false, 
				'msg': '엑셀 다운로드 실행 중 시스템 오류가 발생했습니다 ['+err+'] 시스템 관리자에게 문의하세요.'
			});
			
			throw err;
		}
		
		//엑셀 파일 작성 라이브러리 
		
		let xl = require('excel4node');
		let wb = new xl.Workbook(); 
		let ws = wb.addWorksheet('신청정보');
		let titleStyle = wb.createStyle({
			
			alignment:{
				horizontal : ['center'],
				vertical : ['center']
			},
			
			font: {
				color: '#231815', 
				size: 12
			},
			
			border:{
				left:{
					style: 'thin', 
					color: '#000000'
				},
				right:{
					style: 'thin', 
					color: '#000000'
				},
				top:{
					style: 'thin', 
					color: '#000000'
				},
				bottom:{
					style: 'thin', 
					color: '#000000'
				}
			}
		});
		let contentStyle = wb.createStyle({
			
			font: {
				color: '#231815', 
				size: 12
			}, 
			
			border:{
				left:{
					style: 'thin', 
					color: '#000000'
				},
				right:{
					style: 'thin', 
					color: '#000000'
				},
				top:{
					style: 'thin', 
					color: '#000000'
				},
				bottom:{
					style: 'thin', 
					color: '#000000'
				}, 
			} 
		});
		
		ws.cell(1,1).string('고사장').style(titleStyle); 
		ws.cell(1,2).string('학교').style(titleStyle); 
		ws.cell(1,3).string('반').style(titleStyle); 
		ws.cell(1,4).string('주소').style(titleStyle); 
		ws.cell(1,5).string('부서').style(titleStyle); 
		ws.cell(1,6).string('이름').style(titleStyle); 
		ws.cell(1,7).string('신청한 반').style(titleStyle); 
		
		for(let i=0; i<rows.length; ++i){
			let temp = rows[i]; 
			let rowNm = i+2; 
			ws.cell(rowNm,1).string(temp.EXAM_NAME).style(contentStyle); 
			ws.cell(rowNm,2).string(temp.EXAM_SCHOOL).style(contentStyle); 
			ws.cell(rowNm,3).string(temp.PERIOD_CLASS.toString()).style(contentStyle); 
			ws.cell(rowNm,4).string(temp.EXAM_ADDR).style(contentStyle); 
			ws.cell(rowNm,5).string(temp.DEPARTMENT_NAME).style(contentStyle); 
			ws.cell(rowNm,6).string(temp.USER_NAME).style(contentStyle); 
			ws.cell(rowNm,7).string(temp.APPLY_CLASS.toString()).style(contentStyle); 
	
		}
		let fileNm = name+'.xlsx';

		wb.write('public/gsv/excel/'+fileNm);	//파일 작성 
		
		res.send({
			result : true, 
			url : '/gsv/main/download/'+fileNm 
		});

	});
};


module.exports.logout = (req, res) => {						
	req.logout();
	res.redirect('/');
};