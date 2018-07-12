(function(){
	"use strict";
	
	$(document).ready(function() {
		let category = $('#category').val();
		
		if(window.gosa.isNull(category)){
			$('#searchCategory option[value=id]').attr('selected', 'selected');
		}else{
			$('#searchCategory option[value='+category+']').attr('selected', 'selected');
		}
		
	});
	
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
	
	//검색 버튼 클릭 
	$("#searchBtn").on({
		click:function(){
			let category = $('#searchCategory').val();
			let word = $('#searchWord').val(); 
			let page = $('#page').val();
			let url = $('#searchBtn').data('url');
			
			if(!window.gosa.isNull(word)){
				let action = url +'/'+ page + '/' + category + '/' + word;
				$('#searchForm').attr('action', action);
			}
		}
	});
	
	//검색폼
	$("#searchForm").on({
		keydown:function(e){
			
			if(e.which === 13){
				let category = $('#searchCategory').val();
				let word = $('#searchWord').val(); 
				let page = $('#page').val();
				let url = $('#searchBtn').data('url');
				
				if(!window.gosa.isNull(word)){
					let action = url +'/'+ page + '/' + category + '/' + word;
					$(this).attr('action', action);
				}
			}
		}
	});
	
	
})();