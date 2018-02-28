/**
 * http://usejsdoc.org/
 */

var schedule =  require('../../models/adm/schedule');
var bcrypt = require('bcrypt-nodejs');

module.exports.insert = (req, res) => {
	
	let params = {
			'name': req.body.NAME, 
			'applyDate': req.body.APPLY_DATE, 
			'attendanceDate': req.body.ATTENDANCE_DATE
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
			'applyDate': req.body.APPLY_DATE, 
			'attendanceDate': req.body.ATTENDANCE_DATE
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