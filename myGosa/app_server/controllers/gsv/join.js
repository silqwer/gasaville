/*
 * @comment : 사용자 회원가입 controllers
 * ------------------------------
 * @date 	: update-2018.03.20
 * @author 	: vayu@tekville.com
 *
 */
var join =  require('../../models/gsv/join');
//var bcrypt = require('bcrypt-nodejs');

module.exports.insert = (req, res) => {
	let passwd = null;
	bcrypt.hash(req.body.password, null, null, function(err, hash) {
		if(err) {
			console.log(err);
			throw err;
		}

		passwd = hash;
	});

	let param = {
		id 			: req.body.id,
		name 		: req.body.name,
		password 	: passwd,
		cellphone 	: req.body.cellphone,
		department_seq : req.body.department_seq,
		position_seq : req.body.position_seq
	};

	join.insert(param, function(err, rows) {
		if(err) {
			console.log(err);
			throw err;
		}

		res.send({
			'result': true
		});
	});
};

module.exports.main = (req, res) => {
	let department = null;

	join.departmentList(function(err, rows) {
		if(err) {
			console.log(err);
			throw err;
		}
 
		department = rows;

		join.positionList(function(err, rows) {
			if(err) {
				console.log(err);
				throw err;
			}

			res.render('gsv/index', {
				body : 'join',
				department : department,
				position: rows
			});
		});
	});
};

module.exports.availableId = (req, res) => {
	let result = null;
	let param = {
		id: req.body.inputId
	};

	join.availableId(param, function(err, rows) {
		if(err) {
			console.log(err);
			throw err;
		}

		if(rows[0].SEQ===0) {
			result = true;
		} else {
			result = false;
		}

		res.send({
			'result': result
		});
	});
};
