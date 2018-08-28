/**
 * http://usejsdoc.org/
 */

var schedule =  require('../../models/adm/schedule');

module.exports.count = (req, res) => {
	
	let applyDate = req.body.APPLY_DATE;
	let date = new Date(applyDate);
	
	let month = (date.getMonth()+1) < 10 ? '0'+(date.getMonth()+1) : (date.getMonth()+1);
  	applyDate = date.getFullYear() + '-' + month;
	
	schedule.count(applyDate, function(err, rows){
		if (err) {
			console.error(err);
			throw err;
		}
	
		if(rows.length === 0){
			res.send({
				'result': true
			});
		}else{
			res.send({
				'result': false, 
				'cnt': rows[0].CNT,
				'thisMonth' : rows[0].THIS_MONTH
			});
		}
	});
};

module.exports.insert = (req, res) => {
	
	let params = {
			'name': req.body.NAME, 
			'applyDate': req.body.APPLY_DATE.concat(' 10:00:00'), 
			'attendanceDate': req.body.ATTENDANCE_DATE.concat(' 12:30:00')
	};
	
	schedule.insert(params, function(err, rows){
		if (err) {
			console.error(err);
			throw err;
		}

		res.send({
			'result': true, 
			'seq': rows.insertId
		});
	});
	
};

module.exports.update = (req, res) => {
	
	let params = {
			'seq':  req.body.SEQ,
			'name': req.body.NAME, 
			'applyDate': req.body.APPLY_DATE.concat(' 10:00:00'), 
			'attendanceDate': req.body.ATTENDANCE_DATE.concat(' 12:30:00')
	};
	
	schedule.update(params, function(err, rows){
		if (err) {
			console.error(err);
			throw err;
		}

		res.send({
			'result': true, 
			'seq': rows.insertId
		});
	});
	
};

module.exports.delete = (req, res) => {
	
	let seq = req.body.SEQ;
	
	schedule.delete(seq, function(err, rows){
		if (err) {
			console.error(err);
			throw err;
		}

		res.send({
			'result': true
		});
	});
};