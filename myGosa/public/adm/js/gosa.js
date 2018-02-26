const Gosa = (function(){
	class Gosa {
		constructor(){
			
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

	}
	
	window.gosa = new Gosa();
})();