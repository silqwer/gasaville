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
			table : $('#cmtList')
		},

		
		listeners: {
			apply: {
				click : function() {
					
					let callback = (data) => {
						if(data.result){
							alert('신청을 완료했습니다.');
						}else{
							alert('이미 신청을 했습니다.');
						}
					}
					
					let self = $(this)[0];
					let isSuccess = Main.fn.connectAjax('/gsv/main/insertApply', 'post', 'false', {
						period: $(self).data('period'),
						schedule: $(self).data('schedule'),
						class: $(self).data('class')
					}, callback);

					

					location.reload();
				}
			},
			
			cancel: {
				click : function() {
					let self = $(this)[0];
					let agree = confirm('신청을 취소하겠습니까?');

					if(agree) {
						let success = Main.fn.connectAjax('/gsv/main/deleteApply', 'post', 'false', {
							period: $(self).data('period'),
							schedule: $(self).data('schedule'),
							class: $(self).data('class')
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
					
					
					Main.fn.popUp('.dimbg', '.popwrap');
					
				}
			},
			
			more : {
				click : function(){
					let self = $(this)[0];
					let exam = $(self).data('exam');
					let page = Number($(self).data('page')) + 5;
					
					let params = {
						'page': page, 
						'exam': exam
					}; 
					
					let callback = (data) => {
						
						if(!data.result){
							console.log('comment more error'); 
							return;
						}
						
						let listLength = data.list.length;
						
						if(listLength <= 0){
							alert('더 이상 가져올 데이터가 없습니다.');
							return;
						}
						
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
								str += '<button type="button" data-comment="'+list[i].COMMENT_SEQ+'" class="sbtn fcblue wrtBtn"><i class="fa fa-pencil-alt"></i></button>';
								str += '<button type="button" data-comment="'+list[i].COMMENT_SEQ+'" class="sbtn fcred ml5 dltBtn"><i class="fa fa-trash-alt"></i></button>';
								str += '<button type="button" data-comment="'+list[i].COMMENT_SEQ+'" class="sbtn fcgreen ml5 entBtn"><i class="fa fa-check"></i></button>';
								str += '</p>'; 
							}
							
							str += '</td>';
							str += '<td>'+list[i].USER_NAME+'</td>';
							str += '</tr>';
							
							$('#cmtList tbody').append(str);
							
						}
						
						$(self).data('page', page);	//data-page 증가된 값으로 설정 
					}
					// 이벤트 바인딩 
					//$('#cmtList').on('click', '.wrtBtn', Main.listeners.write);
					let isSuccess = Main.fn.getDataAjax('/main/exam/comment/list/more', 'post', 'false', params, callback);
				}
			}, 
			
			moremore : {
				click : function(){
					let self = $(this)[0];
					let exam = $(self).data('exam');
					let size = Number($(self).data('size')) + 5;

					let params = {
						'page': size, 
						'exam': exam
					}; 

					let callback = (data) => {
						if(!data.result){
							console.log('comment more error'); 
							return;
						}
						
						let listLength = data.list.length;
						
						if(listLength <= 0){
							alert('더 이상 가져올 데이터가 없습니다.');
							return;
						}
						
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
						
						$(self).data('page', size);	//data-page 증가된 값으로 설정 
					}

					let moreComment = Main.fn.getDataAjax('/main/exam/comment/list/more', 'post', 'false', params, callback);
					
					//location.href = '/gsv/main/exam/comment/list/'+exam+'/'+size;
				}
			}, 
			
			write : {
				click : function(){
					let self = $(this)[0];
					let exam = $(self).data('exam');
					console.log('update:'+exam);
					console.log('comment:'+$(self).data('comment'));
					alert('update');
				}
			},
			
			delete : {
				click : function(){
					let self = $(this)[0];
					let exam = $(self).data('exam');
					console.log('delete:'+exam); 
					alert('delete'); 
				}
			},
			
			enter : {
				click : function(){
					let self = $(this)[0];
					let exam = $(self).data('exam');
					console.log('confirm:'+exam); 
					alert('confirm');
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
					url : url,
					type: type,
					async: isSync,
					data: params,
					success : function(data, status) {
						if(typeof(cb) === 'function'){
							cb(data);
						}else{
							eval(cb);
						}
					},
					error: function(error) {
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
					url : url,
					type: type,
					async: isSync,
					data: params,
					success : function (data, status) {
						if(typeof(cb) === 'function'){
							cb(data);
						}else{
							eval(cb);
						}
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
			}, 
			
			googleMapInit : function (divId, addr){
				function initMap(){
					let map = new google.maps.Map(document.getElementById(divId), {
						center: {lat: -33.8688, lng: 151.2195},
				        zoom: 17
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
			Main.triggers.apply.on(Main.listeners.apply);
			Main.triggers.cancel.on(Main.listeners.cancel);
			Main.triggers.examName.on(Main.listeners.popWrap);
			Main.triggers.close.on(Main.listeners.closeWrap);
			Main.triggers.dimbg.on(Main.listeners.dimbgEvent);
			Main.triggers.more.on(Main.listeners.moremore);
			Main.triggers.write.on(Main.listeners.write);
			Main.triggers.delete.on(Main.listeners.delete);
			Main.triggers.enter.on(Main.listeners.enter);
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