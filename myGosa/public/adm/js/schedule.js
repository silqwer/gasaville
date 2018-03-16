(function(){
	"use strict";
	
	//일정 등록
	$("#addBtn").on({
		click:function(){
			
			let callback = (data) => {
				
				if(data.result){
					let eventData = {
							seq: data.seq,
							title: $('#scheduleName').val(),
							start: $('#applyDate').val(),
							applyDate: $('#applyDate').val(),
							attendanceDate: $('#attendanceDate').val()
				    };
					
					$('#calendar').fullCalendar('renderEvent', eventData, true);
				}
				
				$('#calendar').fullCalendar('unselect');
				
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
	$("#deleteBtn").on({
		click:function(){
			
			let callback = (data) => {
				
				if(data.result){
				 
					let scheduleId = $('#udtSchId').val();
					$("#calendar").fullCalendar('removeEvents', scheduleId);
				}
				
				$('#calendar').fullCalendar('unselect');
				
			}
			
			let comAjaxForm = window.gosa.createAjaxForm('commonForm');
			comAjaxForm.setUrl('/admin/schedule/delete');
			comAjaxForm.addParam("SEQ", $('#udtSchSeq').val());
			comAjaxForm.setCallback(callback);
			comAjaxForm.ajax();
			
		}
	});
	
	//일정 수정
	$("#updateBtn").on({
		click:function(){
			
			let callback = (data) => {
				
				if(data.result){
					let eventDate = window.gosa.schedule;
					eventDate.title = $('#udtSchName').val();
					eventDate.start._i= $('#udtAppDate').val();
					eventDate.attendance_date = $('#udtAttDate').val();
					
					$('#calendar').fullCalendar('updateEvent', eventDate);
					
				}
				
				$('#calendar').fullCalendar('unselect');
				
			}
		
			let comAjaxForm = window.gosa.createAjaxForm('commonForm');
			comAjaxForm.setUrl('/admin/schedule/update');
			comAjaxForm.addParam("SEQ", $('#udtSchSeq').val());
			comAjaxForm.addParam("NAME", $('#udtSchName').val());
			comAjaxForm.addParam("APPLY_DATE", $('#udtAppDate').val());
			comAjaxForm.addParam("ATTENDANCE_DATE", $('#udtAttDate').val());
			comAjaxForm.setCallback(callback);
			comAjaxForm.ajax();
			
		}
	});
	
})();