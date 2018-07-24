(function(){
	"use strict";
	
	$(document).ready(function() {
		let category = $('#category').val();
		
		if(window.gosa.isNull(category)){
			$('#searchCategory option[value=name]').attr('selected', 'selected');
		}else{
			$('#searchCategory option[value='+category+']').attr('selected', 'selected');
		}
		window.gosa.tableRowspan('examTable');
	});
	
	$("#addBtn").on({
		click:function(){
			
			//수정값 벨리데이션 체크 	
			let page = $('#examPage').val();
			location.href = '/admin/exam/insert/'+page;
		}
	});
	
	$("#insertBtn").on({
		click:function(){
			
			//수정값 벨리데이션 체크 	
			
			let comSubmitForm = window.gosa.createSubmitForm('commonForm');
			comSubmitForm.setUrl('/admin/exam/insert');
			comSubmitForm.addParam("NAME", $('#examName').val());
			comSubmitForm.addParam("SCHOOL", $('#examSch').val());
			comSubmitForm.addParam("ADDR", $('#examAddr').val());
			comSubmitForm.submit();
		}
	});
	
	
	
	$("#updateBtn").on({
		click:function(){
			
			//수정값 벨리데이션 체크 	
			
			let comSubmitForm = window.gosa.createSubmitForm('commonForm');
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
			let comSubmitForm = window.gosa.createSubmitForm('commonForm');
			comSubmitForm.setUrl('/admin/exam/delete');
			comSubmitForm.addParam("PAGE", $('#examPage').val());
			comSubmitForm.addParam("SEQ", $('#examSeq').val());
			comSubmitForm.submit();
		}
	});
	
	$("#cancelBtn").on({
		click:function(){
			let page = $('#examPage').val();
			location.href = '/admin/exam/list/'+page;
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