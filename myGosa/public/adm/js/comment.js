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