(function(){
	"use strict";
	
  	$("#clossBtn").on({
		click:function(){
			//location.href = '/admin/apply/stats/closs';
			$('#statsIframe').attr('src','/admin/apply/stats/closs');
			
		}
	});
  	
  	$("#visitBtn").on({
		click:function(){
			//location.href = '/admin/apply/stats/visit';
			$('#statsIframe').attr('src','/admin/apply/stats/visit');
		}
  	
	});
  	
  	$("#accrueBtn").on({
		click:function(){
			//location.href = '/admin/apply/stats/accrue';
			$('#statsIframe').attr('src','/admin/apply/stats/accrue');
		}
	});
  	
	$("#userBtn").on({
		click:function(){
			//location.href = '/admin/apply/stats/user';
			$('#statsIframe').attr('src','/admin/apply/stats/user');
		}
	});
  	
	
})();