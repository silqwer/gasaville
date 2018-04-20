var notice =  require('../../models/gsv/notice');

module.exports.list = (req, res) => {
	res.redirect('/gsv/notice/list/1');
};

module.exports.listPage = (req, res) => {
	notice.count(function(err, rows) {
		let noticeSate 		= false;
		let noticePage		= req.params.page;							//현재 페이지 
		let noticeCount		= rows[0].COUNT;							//전체 글 개수
		let noticeLimit 	= 10;										//보여줄 글 최대 개수 
		let noticeAllPage	= Math.ceil(noticeCount/noticeLimit);		//전체 페이지 개수
		let noticePageLimit	= 2;										//보여줄 페이지 최대 개수
		let noticeSection	 	= Math.ceil(noticePage / noticePageLimit);	//현재 페이지 섹션
		let noticeAllSection = Math.ceil(noticeCount / noticePageLimit);//전체 페이지 섹션
		let noticeFirstSection = (noticeSection * noticePageLimit) - (noticePageLimit - 1); 	//현재 페이지 섹션의 첫 페이지
		let noticeLastSection = null;
		let noticePrevPage	= (noticeSection - 1) * noticePageLimit;	//이전 페이지 섹션
		let noticeNextPage	= ((noticeSection + 1) * noticePageLimit) - (noticePageLimit - 1);	//다음 페이지 섹션

		if(noticeSection === noticeAllSection) {
			noticeLastSection = noticeAllSection;						// 현제 페이지 섹션이 마지막 섹션일 경우 
		} else {
			noticeLastSection = noticeSection * noticePageLimit;		// 현재 섹션의 마지막 페이지
		}

		let noticeOffset	= (noticeLimit * noticePage) - noticeLimit;

		if(noticePage < 1 || (noticeAllPage && noticePage > noticeAllPage)) {
			noticeSate = false;
		}

		notice.list(noticeOffset, function(err, rows) {
			if(err) {
				console.log(err);
				throw err;
			}

			res.render('gsv/index', {
				body: 'notice/list',
				noticeList : rows,
				prevPage : noticePrevPage,
				nextPage : noticeNextPage,
				nowSection : noticeSection,
				nowPage	: noticePage

			});
		});
	});
};

module.exports.viewPage = (req, res) => {
	let list = req.params.page;
	let view = req.params.view;
	let record = null;

	notice.view(view, function(err, rows) {
		if(err) {
			console.log(err);
			throw err;
		}

		record = rows;

		notice.getNearRecored(view, function(err, rows) {
			res.render('gsv/index', {
				body: 'notice/view',
				list : list,
				nearRecord: rows,
				content: record
			});
		});
	});
}
