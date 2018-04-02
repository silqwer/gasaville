(function() {
	'use strict';

	const Main = {

		triggers: {
			apply : $('.applyBtn'),
			cancel : $('.cancelBtn')
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
		}
	};

	Main.binding();
})();