(function(){
	"use strict";
	
  	$("#clossBtn").on({
		click:function(){
			location.href = '/admin/apply/stats/closs';
		}
	});
  	
  	$("#visitBtn").on({
		click:function(){
			location.href = '/admin/apply/stats/visit';
		}
  	
	});
  	
  	$("#accrueBtn").on({
		click:function(){
			location.href = '/admin/apply/stats/accrue';
		}
	});
  	
	$("#userBtn").on({
		click:function(){
			location.href = '/admin/apply/stats/user';
		}
	});
  	
	
})();