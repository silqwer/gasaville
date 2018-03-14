(function(){
	"use strict";
	
	$(".update").on({
		click:function(){//ajax
			let seq = this.id.split('_')[1]; 
			let name = $('#name_'+seq).val();
			let callback = (data) => {
				if(data.result){
					alert('적용했습니다.');
				}
			}
			
			let comAjaxForm = window.gosa.createAjaxForm('commonForm');
			comAjaxForm.setUrl('/admin/department/update');
			comAjaxForm.addParam("NAME", name);
			comAjaxForm.addParam("SEQ", seq);
			comAjaxForm.setCallback(callback);
			comAjaxForm.ajax();
			
		}
	});
	
	$(".delete").on({
		click:function(){
			let seq = this.id.split('_')[1];
			let comSubmitForm = window.gosa.createSubmitForm('commonForm');
			comSubmitForm.setUrl('/admin/department/delete');
			comSubmitForm.addParam("SEQ", seq);
			comSubmitForm.submit();
		}
	});
	
})();