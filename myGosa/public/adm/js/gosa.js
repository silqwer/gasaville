const Gosa = (function(){
	class Gosa {
		constructor(){
			this.schedule; 
		}
		
		checkFormId (id) {
			return this.isNull(id) === true ? 'commonForm' : id;
		}
		
		move (url) {
			let frm = this.createSubmitForm('commonForm');
			frm.setUrl(url);
			frm.submit();
		}
		
		createSubmitForm (id) {
			let comSubmitFormId = this.checkFormId(id);
			
			class ComSubmit {
				constructor(comSubmitFormId){
					this.formId = comSubmitFormId;
					this.url = '';
					this.method = 'post';
					
					if(this.formId === 'commonForm'){
						let frm = $('#commonForm');
						if(frm.length > 0){
							frm.remove();
						}
						let str = '<form id="commonForm" name="commonForm"></form>';
						$('body').append(str);
						
						$("#commonForm")[0].reset();
						$("#commonForm").empty();
					}
				}
				
				setUrl (url) {
					this.url = url;
				}
				
				addParam (key, value) {
					let str = '<input type="hidden" name="'+key+'" id="'+key+'" value="'+value+'">';
					$('#'+this.formId).append(str);
				}
				
				submit () {
					let frm = $('#'+this.formId)[0];
					frm.action = this.url;
					frm.method = this.method;
					frm.submit();
				}
			}
			
			return new ComSubmit (comSubmitFormId);
		}
		
		createAjaxForm (id) {
			let comAjaxFormId = this.checkFormId(id);
			
			class ComAjax {
				constructor (comAjaxFormId) {
					this.url = '';
					this.formId = comAjaxFormId;
					this.param = '';
					this.callback = '';
					this.type = 'POST';
					this.async = false;
					
					if(this.formId === 'commonForm'){
						let frm = $('#commonForm');
						if(frm.length > 0){
							frm.remove();
						}
						let str = '<form id="commonForm" name="commonForm"></form>';
						$('body').append(str);
					}
				}
				
				setUrl (url) {
					this.url = url;
				}
				
				setCallback (callback) {
					this.callback = callback;
				}
				
				addParam (key, value) {
					this.param = this.param + '&' + key + '=' + value;
				}
				
				ajax () {
					if(this.formId !== 'commonForm'){
						this.param += '&' + $('#'+this.formId).serialize();
					}
					
					let cb = this.callback;
					$.ajax({
						url : this.url,
						type : this.type, 
						data : this.param,
						async : this.async, 
						success : function (data, status) {
							if(typeof(cb) === 'function'){
								cb(data);
							}else{
								eval(cb);
							}
						}
					});
				}
			}
			return new ComAjax(comAjaxFormId);
		}
		
		isNull (str) {
			let chkStr = new String(str);
			
			if (chkStr.valueOf() === 'undefined'){
				return true;
			} 
			
			if(chkStr === null){
				return true;
			}
			
			if(chkStr.toString().length === 0){
				return true;
			}
			
			if(str === 'NaN'){
				return true;
			}
			
			return false;
		}
		
		updateLayerPopup(el, schedule) {
			let $el = $(el);       									 //레이어의 id를 $el 변수에 저장
			let isDim = $el.prev().hasClass('dimBg');   			//dimmed 레이어를 감지하기 위한 boolean 변수
			let schName = '';
			let self = this;
			let isApply = false;
			
			if(schedule.title.match('신청일')){
				schName = schedule.title.replace(' 신청일', '');
				$('#udtAppDate').prop('readonly', false);
				$('#udtAttDate').prop('readonly', true);
				isApply = true;
			}else{
				schName = schedule.title.replace(' 출석일', '');
				$('#udtAppDate').prop('readonly', true);
				$('#udtAttDate').prop('readonly', false);
				isApply = false;
			}
			
			$('#udtSchName').val(schName);
			$('#udtAppDate').val(schedule.apply_date);
			$('#udtAttDate').val(schedule.attendance_date);
			$('#udtSchSeq').val(schedule.seq);
			$('#udtSchId').val(schedule._id);
		
			isDim ? $('.dim-layer2').fadeIn() : $el.fadeIn();

	        let $elWidth = ~~($el.outerWidth()),
	            $elHeight = ~~($el.outerHeight()),
	            docWidth = $(document).width(),
	            docHeight = $(document).height();

	        // 화면의 중앙에 레이어를 띄운다.
	        if ($elHeight < docHeight || $elWidth < docWidth) {
	            $el.css({
	                marginTop: -$elHeight /2,
	                marginLeft: -$elWidth/2
	            })
	        } else {
	            $el.css({top: 0, left: 0});
	        }

	        $el.find('a.btn-layerClose').click(function(){
	            isDim ? $('.dim-layer2').fadeOut() : $el.fadeOut(); // 닫기 버튼을 클릭하면 레이어가 닫힌다.
	            return false;
	        });

	        $('.layer .dimBg').click(function(){
	            $('.dim-layer2').fadeOut();
	            return false;
	        });
	        
	        $("#updateBtn").click(function(){
	    			
    			let callback = (data) => {
    				
    				if(!data.result){
    					console.log('$("#updateBtn").click Error!');
    					return; 
    				}
    				
    				if(isApply){
    					schedule.title = $('#udtSchName').val().concat(' 신청일');
    					schedule.start = moment($('#udtAppDate').val());
    				}else{
    					schedule.title = $('#udtSchName').val().concat(' 출석일');
    					schedule.start = moment($('#udtAttDate').val());
    				}
    				schedule.apply_date = $('#udtAppDate').val();
					schedule.attendance_date = $('#udtAttDate').val();
    				$('#calendar').fullCalendar('updateEvent', schedule);
    				
    			}
    		
    			let comAjaxForm = self.createAjaxForm('commonForm');
    			comAjaxForm.setUrl('/admin/schedule/update');
    			comAjaxForm.addParam("SEQ", $('#udtSchSeq').val());
    			comAjaxForm.addParam("NAME", $('#udtSchName').val());
    			comAjaxForm.addParam("APPLY_DATE", $('#udtAppDate').val());
    			comAjaxForm.addParam("ATTENDANCE_DATE", $('#udtAttDate').val());
    			comAjaxForm.setCallback(callback);
    			comAjaxForm.ajax();
	    		
	    	});
		}
		
		addLayerPopup (el) {
		
			let $el = $(el);        //레이어의 id를 $el 변수에 저장
			let isDim = $el.prev().hasClass('dimBg');   //dimmed 레이어를 감지하기 위한 boolean 변수
			$('#udtAttDate').prop('readonly', false);
			
			
	        isDim ? $('.dim-layer').fadeIn() : $el.fadeIn();
	        
	        $('#scheduleName').val('');
	        $('#applyDate').val('');
	        $('#attendanceDate').val('');
	        
	        let $elWidth = ~~($el.outerWidth()),
	            $elHeight = ~~($el.outerHeight()),
	            docWidth = $(document).width(),
	            docHeight = $(document).height();

	        // 화면의 중앙에 레이어를 띄운다.
	        if ($elHeight < docHeight || $elWidth < docWidth) {
	            $el.css({
	                marginTop: -$elHeight /2,
	                marginLeft: -$elWidth/2
	            })
	        } else {
	            $el.css({top: 0, left: 0});
	        }

	        $el.find('a.btn-layerClose').click(function(){
	            isDim ? $('.dim-layer').fadeOut() : $el.fadeOut(); // 닫기 버튼을 클릭하면 레이어가 닫힌다.
	            return false;
	        });

	        $('.layer .dimBg').click(function(){
	            $('.dim-layer').fadeOut();
	            return false;
	        });
		}

	}
	
	window.gosa = new Gosa();
})();