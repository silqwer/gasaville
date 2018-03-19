var notice =  require('../../models/gsv/notice');

module.exports.list = (req, res) => {
	notice.list(0, function(err, rows) {
		if(err) {
			console.log(err);
			throw err;
		}

		res.render('gsv/index', {
			body : 'notice/list',
			list: rows
		});
	});
};
