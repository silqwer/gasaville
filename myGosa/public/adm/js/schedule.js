(function(){
	"use strict";
	
	//일정 등록
	$("#addBtn").on({
		click:function(){
			
			let callback = (data) => {
				console.log(data);
				if(data.result){
					let eventData = {
							seq: data.seq,
							title: $('#scheduleName').val(),
							start: $('#applyDate').val(),
							applyDate: $('#applyDate').val(),
							attendanceDate: $('#attendanceDate').val()
				    };
				 
					$('#calendar').fullCalendar('renderEvent', eventData, true);
					console.log('seq:'+eventData.seq);
				}
				
				$('#calendar').fullCalendar('unselect');
				console.log('seq:'+eventData.seq);
			}
			
			let comAjaxForm = window.gosa.createAjaxForm('commonForm');
			comAjaxForm.setUrl('/admin/schedule/insert');
			comAjaxForm.addParam("NAME", $('#scheduleName').val());
			comAjaxForm.addParam("APPLY_DATE", $('#applyDate').val());
			comAjaxForm.addParam("ATTENDANCE_DATE", $('#attendanceDate').val());
			comAjaxForm.setCallback(callback);
			comAjaxForm.ajax();
			
		}
	});
	
	//일정 삭제 
	//일정 수정
	
})();