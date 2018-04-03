var main =  require('../../models/gsv/main');

module.exports.index = (req, res) => {
	res.render('gsv/index', { 
		body : 'login' 
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
		'user' 	: req.user.SEQ,
		'seq'	: req.body.period
	};

	main.possibleInsert(params, function(err, rows) {

		if(err) {
			console.log(err);
			throw err;
		}

		if(!Array.isArray(rows.STATUS, [1, 2])) {
			let insertParam = {
				period: req.body.period,
				schedule: req.body.schedule,
				user: req.user.SEQ,
				class: req.body.class,
				ip: userIp
			};

			main.insertApply(insertParam, function(err, rows) {

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

module.exports.logout = (req, res) => {						
	req.logout();
	res.redirect('/');
}

// module.exports.join = function(req, res){
// 	res.render('gsv/index', { 
// 		title : 'join',
// 		contents : 'join'
// 	} );
// };