(function(){
	"use strict";
	
	$("#updateBtn").on({
		click:function(){
			
			//수정값 벨리데이션 체크 	
			let comSubmitForm = window.gosa.createSubmitForm('commonForm');
			comSubmitForm.setUrl('/admin/users/update');
			comSubmitForm.addParam("DEPARTMENT", $('#department').val());
			comSubmitForm.addParam("POSITION", $('#position').val());
			comSubmitForm.addParam("ADMIN", $('#admin').val());
			comSubmitForm.addParam("NAME", $('#userName').val());
			comSubmitForm.addParam("CELLPHONE", $('#userCellphone').val());
			comSubmitForm.addParam("PAGE", $('#usersPage').val());
			comSubmitForm.addParam("SEQ", $('#usersSeq').val());
			comSubmitForm.submit();
		}
	});
	
	$("#deleteBtn").on({
		click:function(){
			let comSubmitForm = window.gosa.createSubmitForm('commonForm');
			comSubmitForm.setUrl('/admin/users/delete');
			comSubmitForm.addParam("PAGE", $('#usersPage').val());
			comSubmitForm.addParam("SEQ", $('#usersSeq').val());
			comSubmitForm.submit();
		}
	});
	
	$("#cancelBtn").on({
		click:function(){
			let page = $('#usersPage').val();
			location.href = '/admin/users/list/'+page;
		}
	});
	
	
})();