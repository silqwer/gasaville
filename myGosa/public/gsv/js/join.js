(function() {
	'use strict';

	const Join = {

		triggers : {
			userId	: $('#userId'),
			userName : $('#userName'),
			userPw	: $('#userPw'),
			matchPw : $('#matchPw'),
			phoneNumber : $('#phoneNumber'),
			department: $('#department'),
			position: $('#position'),
			joinBtn : $('#joinBtn')
		},

		statusId : {
			possible	: false,
			warning 	: '사용할 수 없는 아이디 입니다.'
		},

		listeners : {
			userId 	: {
				focusout: function() {
					let self = $(this);
					let possible = null;

					if(self.val().trim().length === 0) 	{
						$('#statusYesId').hide();
						$('#statusNoId').html('아이디를 입력해 주세요.').show();

						return false;
					}
					
					$.ajax({
						url : '/gsv/join/availableId',
						type: 'post',
						async: true,
						data: {
							inputId: self.val(),
						},
						success : function(responsive) {
							possible = responsive;
						}
					}).done(function() {
						if(possible.result === true) {
							$('#statusYesId').show();
							$('#statusNoId').hide();

							Join.statusId.possible = true;

						} else {
							$('#statusNoId').html('중복된 아이디 입니다.').show();
							$('#statusYesId').hide();

							Join.statusId.possible = false;
						}
					});
				},
			},

			matchPw : {
				'keyup focusout': (e)=> {

					const inputPw = $(Join.triggers.userPw);
					const matchPw = $(Join.triggers.matchPw);

					if(inputPw.val() === '') {
						return false;
					}

					if(inputPw.val() === matchPw.val()) {
						$('#statusNoPw').hide();
						$('#statusYesPw').show();

					} else {
						$('#statusNoPw').show();
						$('#statusYesPw').hide();
					}
				}
			},

			joinBtn : {
				click: ()=> {

					let checkStatus = null;
					let joinData = {
						inputId 		: {'trigger' : Join.triggers.userId, 		'warning' : '아이디를 입력해 주세요.'		},
						inputName 		: {'trigger' : Join.triggers.userName, 		'warning' : '이름을 입력해 주세요.'		},
						inputPw			: {'trigger' : Join.triggers.userPw, 		'warning' : '비밀번호를 입력해 주세요.'		},
						matchPw 		: {'trigger' : Join.triggers.matchPw,		'warning' : '비밀번호 확인을 입력해 주세요.'	},					
						phoneNumber 	: {'trigger' : Join.triggers.phoneNumber, 	'warning' : '연락처를 입력해 주세요.'		},
						department 		: {'trigger' : Join.triggers.department, 	'warning' : '부서를 선택해 주세요.'		},
						position		: {'trigger' : Join.triggers.position, 		'warning' : '직급을 선택해 주세요.'		}
					};

					let checkResult = function() {
						let checkStatus = null;
						$.each(joinData, function(index, selector) {
							if(selector.trigger.val() === '') {
								alert(selector.warning);
								selector.trigger.focus();
								checkStatus = false;
								return false;
							}
						});

						return checkStatus;
					}();

					if(checkResult === false) {
						return false;
					}

					if(Join.statusId.possible === false) {
						alert(Join.statusId.warning);

						return false;
					}

					if(joinData.inputPw.trigger.val()!==joinData.matchPw.trigger.val()) {
						alert("비밀번호가 일치하지 않습니다.");
						return false;
					}

					$.ajax({
						url : '/gsv/join/insert',
						type: 'post',
						async: true,
						data: {
							id: joinData.inputId.trigger.val(),
							name: joinData.inputName.trigger.val(),
							password: joinData.inputPw.trigger.val(),
							cellphone: joinData.phoneNumber.trigger.val(),
							department_seq: joinData.department.trigger.val(),
							position_seq: joinData.position.trigger.val()
						},
						success : function(responsive) {
							if(responsive.result === true) {
								alert("가입을 처리하였습니다.");
								window.location = '/gsv/';
							}
						}
					});
				}
			}
		},

		binding : () => {
			Join.triggers.userId.on(Join.listeners.userId);
			Join.triggers.userPw.on(Join.listeners.matchPw);
			Join.triggers.matchPw.on(Join.listeners.matchPw);
			Join.triggers.joinBtn.on(Join.listeners.joinBtn);
		}
	};

	Join.binding();

})();
