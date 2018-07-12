(function(){
	"use strict";
	
	$(document).ready(function() {
		let category = $('#category').val();
		
		if(window.gosa.isNull(category)){
			$('#searchCategory option[value=name]').attr('selected', 'selected');
		}else{
			$('#searchCategory option[value='+category+']').attr('selected', 'selected');
		}
	});
	
	$("#cancelBtn").on({
		click:function(){
			let page = $('#noticePage').val();
			location.href = '/admin/notice/list/'+page;
			
		}
	});
	
	$("#insertBtn").on({
		click:function(){
			//벨리데이션 체크 
			let contents = $('#contents').tuiEditor('getValue');
			let comSubmitForm = window.gosa.createSubmitForm('commonForm');
			comSubmitForm.setUrl('/admin/notice/insert');
			comSubmitForm.addParam("START_DATE", $('#startDate').val());
			comSubmitForm.addParam("END_DATE", $('#endDate').val());
			comSubmitForm.addParam("TITLE", $('#title').val());
			comSubmitForm.addParam("CONTENTS", contents);
			comSubmitForm.submit();
		}
	});
	
	$("#updateBtn").on({
		click:function(){
			//벨리데이션 체크 
			let contents = $('#contents').tuiEditor('getValue');
			let comSubmitForm = window.gosa.createSubmitForm('commonForm');
			comSubmitForm.setUrl('/admin/notice/update');
			comSubmitForm.addParam("START_DATE", $('#startDate').val());
			comSubmitForm.addParam("END_DATE", $('#endDate').val());
			comSubmitForm.addParam("TITLE", $('#title').val());
			comSubmitForm.addParam("CONTENTS",contents);
			comSubmitForm.addParam("SEQ", $('#noticeSeq').val());
			comSubmitForm.addParam("PAGE", $('#noticePage').val());
			comSubmitForm.submit();
		}
	});
	
	$("#addBtn").on({
		click:function(){
			let page = $('#page').val();
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