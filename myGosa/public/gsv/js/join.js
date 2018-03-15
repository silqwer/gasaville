(function() {
	'use strict';

	const Join = {

		triggers : {
			userId	: $('#userId'),
			userPw	: $('#userPw'),
			joinBtn : $('#joinBtn')
		},

		listeners : {
			userId 	: {
				focusout: function() {
					let self = $(this);

					if(self.val().trim().length === 0) 	return false;
				}
			},

			joinBtn : {
				click: ()=> {

					let inputId	= Join.triggers.userId.val();
					let inputPw	= Join.triggers.userPw.val();

					$.ajax({
						url : '/gsv/join/insert',
						type: 'post',
						async: false,
						data: {
							id: 'grenade',
							name: '수류탄',
							password: 'grenade',
							cellphone: '010-0000-0000',
							department_seq: '1',
							position_seq: '1'
						},
						success : function(responsive) {
							console.log(responsive);
						}
					});
				}
			}
		},

		// fn : {
		// 	ajax : (obj) => {
		// 		if(!obj) console.log('obj is not defined.');

		// 		$.ajax({
		// 			url: obj.url,
		// 			type: 'post',
		// 			async: obj.async,
		// 			data : {
		// 				value: obj.value
		// 			},
		// 			success : (responsive) => {
		// 				console.log(responsive);
		// 			}
		// 		});
		// 	}
		// },

		binding : () => {
			Join.triggers.userId.on(Join.listeners.userId);
			Join.triggers.joinBtn.on(Join.listeners.joinBtn);
		}
	};

	Join.binding();

})();
