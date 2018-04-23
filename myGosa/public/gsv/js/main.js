(function() {
	'use strict';

	const Main = {

		triggers: {
			apply : $('.applyBtn'),
			cancel : $('.cancelBtn'),
			examName : $('.examName'), 
			close : $('.close'), 
			dimbg : $('.dimbg')
		},

		listeners: {
			apply: {
				click : function() {
					let self = $(this)[0];
					let isSuccess = Main.fn.connectAjax('/gsv/main/insertApply', 'post', 'false', {
						period: $(self).data('period'),
						schedule: $(self).data('schedule'),
						class: $(self).data('class')
					});

					if(isSuccess) {
						alert("성공적으로 등록하였습니다.");
					} else {
						alert("등록에 실패하였습니다.");
					}

					location.reload();
				}
			},
			
			cancel: {
				click : function() {
					let self = $(this)[0];
					let agree = confirm('Are you sure want to delete this data?');

					if(agree) {
						let success = Main.fn.connectAjax('/gsv/main/deleteApply', 'post', 'false', {
							period: $(self).data('period'),
							schedule: $(self).data('schedule'),
							class: $(self).data('class')
						});

						if(success) {
							alert("삭제하였습니다.");
						} else {
							alert("처리를 실패하였습니다.");
						}

						location.reload();
					}
				}
			}, 
			
			popWrap : {
				click : function(e){
					Main.fn.preventDefault(e);
					
					let self = $(this)[0];
					let exam = $(self).data('exam');
					
					//참여 이력 
					$('#examIframe').attr('src', '/gsv/main/exam/history/list/'+exam);
					                          
					//후기 리스트
					$('#commentIframe').attr('src', '/gsv/main/exam/comment/list/'+exam);
					
					
					Main.fn.popUp('.dimbg', '.popwrap');
					
				}
			},
			
			dimbgEvent: {
				click : function (){
					let self = $(this)[0];
					Main.fn.thisHide(self);
					Main.fn.selectHide('.popwrap');
				}
			},
			
			closeWrap : {
				click : function(e){
					Main.fn.preventDefault(e);
					Main.fn.selectHide('.dimbg, .popwrap');
				}
			},
		
			
		},

		fn : {
			connectAjax : function(url, type, isSync, params) {
				let isSuccess = null;
				if(!url || !type || !isSync || !params) {
					return false;
				}
				return $.ajax({
					url : url,
					type: type,
					async: isSync,
					data: params,
					success : function(response) {
						return true;
					},
					error: function(error) {
						return false;
					}
				});
			}, 
			
			thisHide : function (self) {
				$(self).hide();
			}, 
			
			selectHide : function (selector) {
				$(selector).hide();
			}, 
			
			preventDefault : function (event) {
				event.preventDefault();	// 기본적인 서브밋 행동을 취소합니다
			}, 
			
			popUp : function (dimBg, popWrap){
				var dimHeight = $(document).height();
				var dimWidth = $(window).width();

				$(dimBg).css({'width':dimWidth,'height':dimHeight});
				$(dimBg).fadeIn(150);

				var left = ($(window).scrollLeft() + ($(window).width() - $('.popwrap').width()) / 2);
				var top = ($(window).scrollTop() + ($(window).height() - $('.popwrap').height()) / 2);

				$(popWrap).css({'left':left, 'top':top, 'position':'absolute'});
				$(popWrap).show();
			}
			
		},

		binding: () => {
			Main.triggers.apply.on(Main.listeners.apply);
			Main.triggers.cancel.on(Main.listeners.cancel);
			Main.triggers.examName.on(Main.listeners.popWrap);
			Main.triggers.close.on(Main.listeners.closeWrap);
			Main.triggers.dimbg.on(Main.listeners.dimbgEvent);
		}
	};

	Main.binding();
})();