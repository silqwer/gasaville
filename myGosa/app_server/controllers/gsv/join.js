/*
 * @comment : 사용자 회원가입 controllers
 * ------------------------------
 * @date 	: update-2018.03.20
 * @author 	: vayu@tekville.com
 *
 */
var join =  require('../../models/gsv/join');

module.exports.insert = (req, res) => {
	let param = {
		id 			: req.body.id,
		name 		: req.body.name,
		password 	: req.body.password,
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

		console.log(rows);

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
