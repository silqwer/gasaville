(function(){
	'use strict';
	
	
	//등록 취소버튼
	$('#cancelBtn').on({
		click:function(){
			let page = $('#examPage').val();
			location.href = '/admin/periods/list/'+page;
		}
	});
	
	//등록하기 버튼 
	$('#addBtn').on({
		click:function(){
			let page = $('#examPage').val();
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
				console.log(periods);
			});
		
			let comSubmitForm = window.gosa.createSubmitForm('commonForm');
			comSubmitForm.setUrl('/admin/periods/insert');
			comSubmitForm.addParam('ARR', JSON.stringify(periodsArr).replace(/"/g, "'"));
			comSubmitForm.submit();
		}
	});
	
	
})();