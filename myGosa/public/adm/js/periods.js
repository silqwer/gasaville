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
	
	$('.monthlist li').on({
		click:function(){ 
			$('.monthlist li').removeClass('chk');
			$('.monthlist li .schName').attr('checked', false);
			
			$(this).addClass('chk');
			$(this).children('.schName').attr('checked', true);
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
	
	//엑셀 파일 업로드 
	$('#sendBtn').on({
		click:function(){
			
		//일정 선택 체크
		let scheduleSeq = $('#scheduleCategory').val();
		if(scheduleSeq === "null"){
			alert('일정을 선택해주세요.');
			return ;
		}
		
		//파일 확장자 체크
		let thumbext = $('#excelFile').val(); 	//파일을 추가한 input 박스의 값
		thumbext = thumbext.slice(thumbext.indexOf(".") + 1).toLowerCase(); //파일 확장자를 잘라내고, 비교를 위해 소문자로 만듬 
		
		if(thumbext !== 'xlsx' && thumbext !== 'xls'){
			alert('엑셀파일(.xlsx, .xls)파일만 등록 가능합니다.');
			return ;
		}
		
		let formData = new FormData();
		let fileData = $("#excelFile")[0].files[0];
		formData.append('excel', fileData);
		
		$.ajax({
			url: "/admin/periods/excel/upload2",
			type: "POST",
			processData: false,
			contentType: false,
			data: formData,
			success: function(result) {
				if (result.code == "0000") {
					alert('success');
				} else {
					$("#photo-upload-error-box").html(result.message);
				}
			},
			error: function(req, status, err) {
				alert("code:"+status+"\n"+"message:"+req.responseText+"\n"+"error:"+err);
			}
		});
			
			/*$('#commonForm').submit();*/
		}
	});
	
	
})();