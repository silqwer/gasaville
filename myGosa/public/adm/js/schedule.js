(function(){
	"use strict";
	
	//일정 등록
	$("#addBtn").on({
		click:function(){
			
			let callback = (data) => {
				
				if(data.result){
					
					//신청일
					let applyDate = {
						'seq': data.seq,
						'title': $('#scheduleName').val().concat(' 신청일'),	
						'start': $('#applyDate').val(),			
						'applyDate': $('#applyDate').val(),		
						'attendanceDate': $('#attendanceDate').val()
					};
					
					//출석일
					let attendanceDate = {
						'seq': data.seq,								
						'title': $('#scheduleName').val().concat(' 출석일'),	
						'start': $('#attendanceDate').val(),			
						'applyDate': $('#applyDate').val(),		
						'attendanceDate': $('#attendanceDate').val()
					};
					
					$('#calendar').fullCalendar('renderEvent', applyDate, true);
					$('#calendar').fullCalendar('renderEvent', attendanceDate, true);
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
	/*$("#updateBtn").on({
		click:function(){
			
			let callback = (data) => {
				
				if(data.result){
					let eventDate = window.gosa.schedule;
					eventDate.title = $('#udtSchName').val().concat(' 신청일');
					eventDate.start = moment($('#udtAppDate').val());
					eventDate.attendance_date = $('#udtAttDate').val();
					console.log(eventDate); 
					
					$('#calendar').fullCalendar('updateEvent', eventDate);
					
				}
		
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
	});*/
	
})();