(function(){
	"use strict";
	
	$("#cancelBtn").on({
		click:function(){
			let page = $('#noticePage').val();
			location.href = '/admin/notice/list/'+page;
			
		}
	});
	
	$("#insertBtn").on({
		click:function(){
			//벨리데이션 체크 
			
			let comSubmitForm = window.gosa.createSubmitForm('commonForm');
			comSubmitForm.setUrl('/admin/notice/insert');
			comSubmitForm.addParam("START_DATE", $('#startDate').val());
			comSubmitForm.addParam("END_DATE", $('#endDate').val());
			comSubmitForm.addParam("TITLE", $('#title').val());
			comSubmitForm.addParam("CONTENTS", $('#contents').val());
			comSubmitForm.submit();
		}
	});
	
	$("#updateBtn").on({
		click:function(){
			//벨리데이션 체크 
		 
			let comSubmitForm = window.gosa.createSubmitForm('commonForm');
			comSubmitForm.setUrl('/admin/notice/update');
			comSubmitForm.addParam("START_DATE", $('#startDate').val());
			comSubmitForm.addParam("END_DATE", $('#endDate').val());
			comSubmitForm.addParam("TITLE", $('#title').val());
			comSubmitForm.addParam("CONTENTS", $('#contents').val());
			comSubmitForm.addParam("SEQ", $('#noticeSeq').val());
			comSubmitForm.addParam("PAGE", $('#noticePage').val());
			comSubmitForm.submit();
		}
	});
	
	$("#addBtn").on({
		click:function(){
			let page = $('#noticePage').val();
			location.href = '/admin/notice/insert/'+page;
		}
	});

	$("#deleteBtn").on({
		click:function(){
			let comSubmitForm = window.gosa.createSubmitForm('commonForm');
			comSubmitForm.setUrl('/admin/notice/delete');
			comSubmitForm.addParam("PAGE", $('#noticePage').val());
			comSubmitForm.addParam("SEQ", $('#noticeSeq').val());
			comSubmitForm.submit();
		}
	});
	
})();