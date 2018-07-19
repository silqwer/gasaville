/**
 * http://usejsdoc.org/
 */

var schedule =  require('../../models/adm/schedule');

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