(function(){
	"use strict";
	
  	$("#clossBtn").on({
		click:function(){
			$('.topmenu ul li').attr('class', '');
			$(this).parents('li').attr('class', 'on');
			$('#statsIframe').attr('src','/admin/apply/stats/closs');
			
		}
	});
  	
  	$("#visitBtn").on({
		click:function(){
			$('.topmenu ul li').attr('class', '');
			$(this).parents('li').attr('class', 'on');
			$('#statsIframe').attr('src','/admin/apply/stats/visit');
		}
  	
	});
  	
  	$("#accrueBtn").on({
		click:function(){
			$('.topmenu ul li').attr('class', '');
			$(this).parents('li').attr('class', 'on');
			$('#statsIframe').attr('src','/admin/apply/stats/accrue');
		}
	});
  	
	$("#userBtn").on({
		click:function(){
			$('.topmenu ul li').attr('class', '');
			$(this).parents('li').attr('class', 'on');
			$('#statsIframe').attr('src','/admin/apply/stats/user');
		}
	});
  	
	
})();