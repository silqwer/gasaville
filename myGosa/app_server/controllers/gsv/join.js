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
}