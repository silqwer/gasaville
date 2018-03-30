(function(){
	'use strict';
	
	
	//등록 취소버튼
	$('#cancelBtn').on({
		click:function(){
			let page = $('#periodPage').val();
			location.href = '/admin/periods/list/'+page;
		}
	});
	
	//등록하기 버튼 
	$('#addBtn').on({
		click:function(){
			let page = $('#periodPage').val();
			location.href = '/admin/periods/insert/'+page;
		}
	});
	
	//등록버튼 
	$('#insertBtn').on({
		click:function(){
			
			let periodsArr = [];
			
			$('.examName:checked').each( function() {
				let periods ={};
				periods.schSeq = parseInt($('.schName:checked').val());
				periods.examSeq = parseInt(this.value);
				periods.examClass = parseInt($('#examClass_'+this.value).val());
				periodsArr.push(periods);
			});
		
			let comSubmitForm = window.gosa.createSubmitForm('commonForm');
			comSubmitForm.setUrl('/admin/periods/insert');
			comSubmitForm.addParam('ARR', JSON.stringify(periodsArr).replace(/"/g, "'"));
			comSubmitForm.submit();
		}
	});
	
	//삭제, 수정
	$('#updateBtn').on({
		click:function(){
			
			let periodsArr = [];
			let name = $('#selectedSchName').val();
			
			$('.examName:checked').each( function() {
				let periods ={};
				periods.schSeq = parseInt($('.schName:checked').val());
				periods.examSeq = parseInt(this.value);
				periods.examClass = parseInt($('#examClass_'+this.value).val());
				periodsArr.push(periods);
			});
			
			let callback = (data) => {
				
				if(data.result){
					if(confirm(name+' 기수를 수정하시겠습니까? ')){
						let comSubmitForm = window.gosa.createSubmitForm('commonForm');
						comSubmitForm.setUrl('/admin/periods/update');
						comSubmitForm.addParam('PAGE', $('#periodPage').val());
						comSubmitForm.addParam('SCHEDULE_SEQ', data.seq);
						comSubmitForm.addParam('ARR', JSON.stringify(periodsArr).replace(/"/g, "'"));
						comSubmitForm.submit();
					}
					
				}else{
					
					if(confirm(name + ' 기수에 신청한 사람이 있습니다. 수정을 하시면 신청정보가 삭제됩니다. 수정하시겠습니까?')){
						
						let comSubmitForm = window.gosa.createSubmitForm('commonForm');
						comSubmitForm.setUrl('/admin/periods/update');
						comSubmitForm.addParam('PAGE', $('#periodPage').val());
						comSubmitForm.addParam('SCHEDULE_SEQ', data.seq);
						comSubmitForm.addParam('ARR', JSON.stringify(periodsArr).replace(/"/g, "'"));
						comSubmitForm.submit();
					}
				}
			}
			
			let comAjaxForm = window.gosa.createAjaxForm('commonForm');
			comAjaxForm.setUrl('/admin/periods/check/apply');
			comAjaxForm.addParam('SCHEDULE_SEQ', parseInt($('#selectedSchSeq').val()));
			comAjaxForm.setCallback(callback);
			comAjaxForm.ajax();
		}
	});
	
	//삭제
	$('#deleteBtn').on({
		click:function(){
			let name = $('#selectedSchName').val();
			let callback = (data) => {
				
				if(data.result){
					
					if(confirm(name+' 기수를 삭제하시겠습니까? ')){
						let comSubmitForm = window.gosa.createSubmitForm('commonForm');
						comSubmitForm.setUrl('/admin/periods/delete');
						comSubmitForm.addParam('PAGE', $('#periodPage').val());
						comSubmitForm.addParam('SCHEDULE_SEQ', data.seq);
						comSubmitForm.submit();
					}
					
				}else{
					
					if(confirm(name + ' 기수에 신청한 사람이 있습니다. 삭제를 하시면 신청정보가 함께 삭제 됩니다. 삭제하시겠습니까?')){
						let comSubmitForm = window.gosa.createSubmitForm('commonForm');
						comSubmitForm.setUrl('/admin/periods/delete');
						comSubmitForm.addParam('PAGE', $('#periodPage').val());
						comSubmitForm.addParam('SCHEDULE_SEQ', data.seq);
						comSubmitForm.submit();
					}
				}
			}
			
			let comAjaxForm = window.gosa.createAjaxForm('commonForm');
			comAjaxForm.setUrl('/admin/periods/check/apply');
			comAjaxForm.addParam('SCHEDULE_SEQ', parseInt($('#selectedSchSeq').val()));
			comAjaxForm.setCallback(callback);
			comAjaxForm.ajax();
		}
	});
	
	//검색 버튼 클릭 
	$("#searchBtn").on({
		click:function(){
		
			let word = $('#searchWord').val(); 
			let page = $('#page').val();
			let url = $('#searchBtn').data('url');
			
			if(!window.gosa.isNull(word)){
				let action = url +'/'+ page + '/' + word;
				$('#searchForm').attr('action', action);
			}
		}
	});
	
	//검색폼
	$("#searchForm").on({
		keydown:function(e){
			
			if(e.which === 13){
				
				let word = $('#searchWord').val(); 
				let page = $('#page').val();
				let url = $('#searchBtn').data('url');
				
				if(!window.gosa.isNull(word)){
					let action = url +'/'+ page + '/' + word;
					$(this).attr('action', action);
				}
			}
		
			
		}
	});

	
	
})();