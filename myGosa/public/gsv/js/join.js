(function() {
	'use strict';

	const Join = {

		triggers : {
			userId	: $('#formId'),
			joinBtn : $('#joinBtn')
		},

		listeners : {
			userId 	: {
				focusout: function() {
					let self = $(this);

					if(self.val().trim().length !== 0) 	return false;

					//ajax에서 스탑!!!! 다음 시간에 또 봐요 :) 

				}
			},

			joinBtn : {
				click: () => {
					
				}
			}
		},

		binding : () => {
			Join.triggers.userId.on(Join.listeners.userId);
			Join.triggers.joinBtn.on(Join.listeners.joinBtn);
		}
	};

	Join.binding();

})();