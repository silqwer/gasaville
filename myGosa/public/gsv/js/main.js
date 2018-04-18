(function() {
	'use strict';

	const Main = {

		triggers: {
			apply : $('.applyBtn'),
			cancel : $('.cancelBtn'),
			examName : $('.examName')
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
				click: function() {
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
			dimLayerPopUp : {
				click: function(){
					let self = $(this)[0];
					let exam = $(self).data('exam');
					
					let $el = $('#commentLayer');        //레이어의 id를 $el 변수에 저장
					let isDim = $el.prev().hasClass('dimBg');   //dimmed 레이어를 감지하기 위한 boolean 변수
					
					isDim ? $('.dim-layer').fadeIn() : $el.fadeIn();

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
			}
		},

		binding: () => {
			Main.triggers.apply.on(Main.listeners.apply);
			Main.triggers.cancel.on(Main.listeners.cancel);
			Main.triggers.examName.on(Main.listeners.dimLayerPopUp);
		}
	};

	Main.binding();
})();