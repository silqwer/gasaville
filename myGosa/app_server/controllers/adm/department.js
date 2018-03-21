/**
 * http://usejsdoc.org/
 */

var department =  require('../../models/adm/department');

//신청 관리  
module.exports.department = (req, res) =>{
	
	department.allLists(function(err, rows){
		if (err) {
			console.error(err);
			throw err;
		}
		
		res.render('adm/department/list', { 
			'title' : '부서 관리',
			'userInfo' : req.user, 
			'list' : rows
		}); 
	});
};

module.exports.update = (req, res) => {
	
	let params = {
			'name': req.body.NAME, 
			'seq': req.body.SEQ
	};
	
	department.update(params, function(err, rows){
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

module.exports.check = (req, res) => {
	
	let name = req.body.NAME;

	
	department.check(name, function(err, rows){
		if (err) {
			console.error(err);
			throw err;
		}
		
		let result = true;
		
		if(rows[0].CNT > 0){
			result = false;
		}
		
		res.send({
			'result': result,
			'name': name,
			'seq': rows.insertId
		});
	});
};

module.exports.delete = (req, res) => {
	let seq = req.body.SEQ;
	
	department.delete(seq, function(err, rows){
		if (err) {
			console.error(err);
			throw err;
		}
	});
	
	res.redirect('/admin/department');
	
};

module.exports.insert = (req, res) => {
	let name = req.body.NAME;
	
	department.insert(name, function(err, rows){
		if (err) {
			console.error(err);
			throw err;
		}

		res.redirect('/admin/department');
	});
	
};





