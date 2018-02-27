(function(){
	"use strict";
	$("#updateBtn").on({
		click:function(){
			
			//수정값 벨리데이션 체크 	
			
			var comSubmitForm = window.gosa.createSubmitForm('commonForm');
			comSubmitForm.setUrl('/admin/exam/update');
			comSubmitForm.addParam("NAME", $('#examName').val());
			comSubmitForm.addParam("SCHOOL", $('#examSch').val());
			comSubmitForm.addParam("ADDR", $('#examAddr').val());
			comSubmitForm.addParam("PAGE", $('#examPage').val());
			comSubmitForm.addParam("SEQ", $('#examSeq').val());
			comSubmitForm.submit();
		}
	});
	
	$("#deleteBtn").on({
		click:function(){
			var comSubmitForm = this.createSubmitForm('commonForm');
			comSubmitForm.setUrl('/sw/login/logout.do');
			comSubmitForm.addParam("OS", OSInfoDev());
			comSubmitForm.addParam("BROWSER", this.contactBrowser());
			comSubmitForm.addParam("URL", document.URL);
			comSubmitForm.submit();
		}
	});
	
	$("#cancelBtn").on({
		click:function(){
			let page = $('#examPage').val();
			location.href = '/admin/exam/list/'+page;
		}

	});
	
	
})();