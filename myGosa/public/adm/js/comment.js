(function(){
	"use strict";
	
	$("#deleteBtn").on({
		click:function(){
			let comSubmitForm = window.gosa.createSubmitForm('commonForm');
			comSubmitForm.setUrl('/admin/comment/delete');
			comSubmitForm.addParam("PAGE", $('#commentPage').val());
			comSubmitForm.addParam("SEQ", $('#commentSeq').val());
			comSubmitForm.submit();
		}
	});
	
	$("#cancelBtn").on({
		click:function(){
			let page = $('#examPage').val();
			location.href = '/admin/comment/list/'+page;
		}

	});
	
	
})();