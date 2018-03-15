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
	
	$("#addBtn").on({
		click:function(){
			let callback = (data) => {
				if(data.result){
					//등록
					let comSubmitForm = window.gosa.createSubmitForm('commonForm');
					comSubmitForm.setUrl('/admin/department/insert');
					comSubmitForm.addParam("NAME", data.name);
					comSubmitForm.submit();
				}else{
					alert(data.name + '은 이미 등록된 부서명 입니다.');
					return ;
				}
			}
			
			let comAjaxForm = window.gosa.createAjaxForm('commonForm');
			comAjaxForm.setUrl('/admin/department/check');
			comAjaxForm.addParam("NAME", $('#name').val());
			comAjaxForm.setCallback(callback);
			comAjaxForm.ajax();
		}
	});
	

	
})();