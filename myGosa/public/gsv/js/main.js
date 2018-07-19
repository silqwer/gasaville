(function() {
	'use strict';
	
	const Main = {

		triggers: {
			apply : $('.applyBtn'),
			cancel : $('.cancelBtn'),
			examName : $('.examName'), 
			close : $('.close'), 
			dimbg : $('.dimbg'), 
			more : $('#cmtMoreBtn'), 
			write : $('.wrtBtn'),
			delete : $('.dltBtn'),
			enter : $('.entBtn'),
			table : $('#cmtList'), 
			cmtInst : $('#cmtIstBtn'),
		},

		
		listeners: {
			apply: {
				click : function() {
					//클릭 이벤트 제거 
					$(this).off('click');
					
					let callback = (data) => {
						if(data.result){
							alert('신청을 완료했습니다.');
						}else{
							alert('이미 신청을 했습니다.');
						}
						
						//클릭 이벤트 적용 
						$(this).on(Main.listeners.apply);
						location.reload();
					}
					
					let self = $(this)[0];
					let isSuccess = Main.fn.connectAjax('/gsv/main/insertApply', 'post', 'false', {
						'period': $(self).data('period'),
						'schedule': $(self).data('schedule'),
						'class': $(self).data('class')
					}, callback);

				}
			},
			
			cancel: {
				click : function() {
					let self = $(this)[0];
					let agree = confirm('신청을 취소하겠습니까?');

					if(agree) {
						let success = Main.fn.connectAjax('/gsv/main/deleteApply', 'post', 'false', {
							'period': $(self).data('period'),
							'schedule': $(self).data('schedule'),
							'class': $(self).data('class')
						});

						if(success) {
							alert("취소하였습니다.");
						} else {
							alert("취소를 실패하였습니다.");
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
					let addr = $(self).data('addr');
					
					
					//구글맵 
					Main.fn.googleMapInit('examMap', addr ); 
					
					//참여 이력 
					$('#examIframe').attr('src', '/gsv/main/exam/history/list/'+exam);
					                          
					//후기 리스트
					$('#commentIframe').attr('src', '/gsv/main/exam/comment/list/'+exam);
					
					//참여이력 유무 가져오기 
					let callback = (data) => {
						if(data.applySeq > 0){
							//동적 Append 시작  cmtInpForm
							$('#cmtInpForm').empty();
							let str = '<input id="cmtContents" type="text">';
							str += '<p class="fr" style="float: left;">';
							str += '<button id="cmtIstBtn" type="button" data-apply="'+data.applySeq+'" data-exam="'+exam+'" class="sbtn"><i class="fa fa-check fcgreen ml5"></i></button>';
							str += '</p>';
							$('#cmtInpForm').append(str);
							
							//동적으로 이벤트 붙이기 
							$('#cmtIstBtn').on(Main.listeners.cmtInst);
						}
					}
					
					let isSuccess = Main.fn.connectAjax('/gsv/main/exam/apply/history', 'post', 'false', {
						'examSeq' : exam
					}, callback);


					
					Main.fn.popUp('.dimbg', '.popwrap');
					
				}
			},
			
			cmtInst: {
				click : function(){
		
					let self = $(this)[0];
					let exam = $(self).data('exam');
					let apply = $(self).data('apply');
					let contents = $('#cmtContents').val();
					
					let callback = (data) => {
						if(data.result){
							$('#commentIframe').attr('src', '/gsv/main/exam/comment/list/'+exam);
							$('#cmtContents').val('');
						}
					}
				
					let isSuccess = Main.fn.connectAjax('/gsv/main/exam/comment/insert', 'post', 'false', {
						'applySeq': apply,
						'examSeq': exam,
						'contents' : contents
					}, callback);
					
				}
			
			}, 
			
			more : {
				click : function(){
					let self = $(this)[0];
					let exam = $(self).data('exam');
					let start =$(self).data('start');
					
					let params = {
						'start': start, 
						'exam': exam
					}; 

					let callback = (data) => {
						if(!data.result){
							alert('더 이상 가져올 데이터가 없습니다.');
							return;
						}
						
						let listLength = data.list.length;
						let list = data.list; 
						let userSeq = data.userInfo.SEQ;
				
						//동적 데이터 넣기 
						for(let i=0; i<listLength; ++i){
							let str = '<tr class="pop-comment">';
							str += '<td>'+list[i].SCHEDULE_NAME+'</td>'; 
							str += '<td>';
							str += '<p class="fl">'+list[i].CONTENTS+'</p>';
							
							//사용자 비교
							if(userSeq === list[i].USER_SEQ){
								str += '<p class="fr">'; 
								str += '<button type="button" data-comment="'+list[i].COMMENT_SEQ+'" class="sbtn fcblue wrtBtn"><i class="fa fa-pencil-alt"></i></button> ';
								str += '<button type="button" data-comment="'+list[i].COMMENT_SEQ+'" class="sbtn fcred ml5 dltBtn"><i class="fa fa-trash-alt"></i></button> ';
								str += '<button type="button" data-comment="'+list[i].COMMENT_SEQ+'" class="sbtn fcgreen ml5 entBtn"><i class="fa fa-check"></i></button> ';
								str += '</p>'; 
							}
							
							str += '</td>';
							str += '<td>'+list[i].USER_NAME+'</td>';
							str += '</tr>';
							
							$('#cmtList tbody').append(str);
							$('#cmtList tbody .wrtBtn[data-comment="'+list[i].COMMENT_SEQ+'"]').on(Main.listeners.write);
							$('#cmtList tbody .dltBtn[data-comment="'+list[i].COMMENT_SEQ+'"]').on(Main.listeners.delete);
							$('#cmtList tbody .entBtn[data-comment="'+list[i].COMMENT_SEQ+'"]').on(Main.listeners.enter);
							
						}
						$('#cmtMoreBtn').data('start', data.start);	//data-page 증가된 값으로 설정 
					}

					let moreComment = Main.fn.getDataAjax('/main/exam/comment/list/more', 'post', 'false', params, callback);
				}
			}, 
			
			write : {
				click : function(){
					let self = $(this)[0];
					let examSeq = $(self).data('exam');
					let cmtSeq = $(self).data('comment');
					
					$(self).hide();									//코멘트 수정 버튼 숨김
					$('.entBtn[data-comment="'+cmtSeq+'"]').show();	//코멘트 수정 확인 버튼 보여주기
					$('.cmtCts[data-comment="'+cmtSeq+'"]').attr("readonly",false);	

				}
			},
			
			delete : {
				click : function(){
					let self = $(this)[0];
					let cmtSeq = $(self).data('comment');
					let examSeq = $(self).data('exam');
					
					if(confirm('후기를 삭제하시겠습니까?')){
						let callback = (data) => {
							if(data.result){
								$('#commentIframe', parent.document).attr('src', '/gsv/main/exam/comment/list/'+data.examSeq);
							}
						}
						
						let isSuccess = Main.fn.connectAjax('/gsv/main/exam/comment/delete', 'post', 'false', {
							'cmtSeq': cmtSeq,
							'examSeq': examSeq
						}, callback);
					}
				}
			},
			
			enter : {
				click : function(){
					let self = $(this)[0];
					let cmtSeq = $(self).data('comment');
					let examSeq = $(self).data('exam');
					let cmtCts = $('.cmtCts[data-comment="'+cmtSeq+'"]').val();
					if(confirm('후기를 수정하시겠습니까?')){
						let callback = (data) => {
							if(data.result){
								$('#commentIframe', parent.document).attr('src', '/gsv/main/exam/comment/list/'+data.examSeq);
								$('#cmtCts').val('');
							}
						}
						
						let isSuccess = Main.fn.connectAjax('/gsv/main/exam/comment/update', 'post', 'false', {
							'cmtSeq': cmtSeq, 
							'examSeq': examSeq,
							'cmtCts':cmtCts
						}, callback);
					}
					
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
			connectAjax : function(url, type, isSync, params, cb) {
				let isSuccess = null;
				if(!url || !type || !isSync || !params) {
					return false;
				}
				return $.ajax({
					'url' : url,
					'type': type,
					'async': isSync,
					'data': params,
					'dataType' : 'json',
					'success' : function(data, status) {
						if(typeof(cb) === 'function'){
							cb(data);
						}else{
							eval(cb);
						}
					},
					'error': function(error) {
						return false;
					}
				});
			}, 
			
			getDataAjax : function(url, type, isSync, params, cb) {
				let isSuccess = null;
				if(!url || !type || !isSync || !params) {
					return false;
				}
				return $.ajax({
					'url' : url,
					'type': type,
					'async': isSync,
					'data': params,
					'dataType' : 'json',
					'success' : function (data, status) {
						if(typeof(cb) === 'function'){
							cb(data);
						}else{
							eval(cb);
						}
					},
					'error': function(error) {
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
			}, 
			
			googleMapInit : function (divId, addr){
				function initMap(){
					let map = new google.maps.Map(document.getElementById(divId), {
						'center': {lat: -33.8688, lng: 151.2195},
						'zoom': 17
				    });
					
					let geoCoder = new google.maps.Geocoder();
					let address = addr;
					
					geoCoder.geocode({'address': address}, function(results, status) {
						if (status === 'OK') {
							map.setCenter(results[0].geometry.location);
							var marker = new google.maps.Marker({
								map: map,
								position: results[0].geometry.location
			            });
			          } else {
			            alert('Geocode was not successful for the following reason: ' + status);
			          }
			        });
				}
				
				window.initMap = initMap ;
				
				$.getScript( "https://maps.googleapis.com/maps/api/js?key=AIzaSyAGDgTLCkAaRkakuNcCw5ORYiST0Y5I1pU&callback=initMap", function( data, textStatus, jqxhr ) {
					console.log( data ); // Data returned
					console.log( textStatus ); // Success
					console.log( jqxhr.status ); // 200
					console.log( "Load was performed." );
				});
			}
			
			
		},

		binding: () => {
			//등록한 트리거.on(함수)
			Main.triggers.apply.on(Main.listeners.apply);
			Main.triggers.cancel.on(Main.listeners.cancel);
			Main.triggers.examName.on(Main.listeners.popWrap);
			Main.triggers.close.on(Main.listeners.closeWrap);
			Main.triggers.dimbg.on(Main.listeners.dimbgEvent);
			Main.triggers.more.on(Main.listeners.more);
			Main.triggers.write.on(Main.listeners.write);
			Main.triggers.delete.on(Main.listeners.delete);
			Main.triggers.enter.on(Main.listeners.enter);
			Main.triggers.cmtInst.on(Main.listeners.cmtInst);
			//Main.triggers.table.on('click', '.wrtBtn', Main.listeners.write);
			
		}
	};

	Main.binding();
	
	/*$(document).ready(function(){
	    $(document).on("click",".wrtBtn",function(event){
	    	alert('?'); 
	    });
	});*/

	
})();