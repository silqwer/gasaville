(function(){
	"use strict";
	
	$(document).ready(function() {
		let category = $('#category').val();
		
		if(window.gosa.isNull(category)){
			$('#searchCategory option[value=examName]').attr('selected', 'selected');
		}else{
			$('#searchCategory option[value='+category+']').attr('selected', 'selected');
		}
		
	});
	
	//스케줄 카테고리 
	$("#scheduleCategory").on({
		change:function(e){
			let schedule = this.value;
			location.href = '/admin/apply/list/1/'+schedule;
		}
	});
	
	//검색 버튼 클릭 
	$("#searchBtn").on({
		click:function(){
			let category = $('#searchCategory').val();
			let word = $('#searchWord').val(); 
			let page = $('#page').val();
			let url = $('#searchBtn').data('url');
			let schedule = $('#scheduleCategory').val();
			
			if(!window.gosa.isNull(word)){
				let action = url +'/'+ page + '/' + schedule + '/' + category + '/' + word;
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
				let schedule = $('#scheduleCategory').val();
				
				if(!window.gosa.isNull(word)){
					let action = url +'/'+ page + '/' + schedule + '/' + category + '/' + word;
					$(this).attr('action', action);
				}
			}
		
			
		}
	});
	
	
	
})();