/*popup*/
function popWrap(){
	var dimHeight = $(document).height();
	var dimWidth = $(window).width();

	$('.dimbg').css({'width':dimWidth,'height':dimHeight});
	$('.dimbg').fadeIn(150);

	var left = ($(window).scrollLeft() + ($(window).width() - $('.popwrap').width()) / 2);
	var top = ($(window).scrollTop() + ($(window).height() - $('.popwrap').height()) / 2);

	$('.popwrap').css({'left':left, 'top':top, 'position':'absolute'});
	$('.popwrap').show();
}

$(document).ready(function(){
	$('.popopen').click(function(e){
		e.preventDefault();
		popWrap();
	});

	$('.close').click(function(e){
		e.preventDefault();
		$('.dimbg, .popwrap').hide();
	});
	$('.dimbg').click(function(){
		$(this).hide();
		$('.popwrap').hide();
	});
})


/*
$(document).ready(function () {  
	$('.left-menu > li > a').click(function(){
		$(this).next().Toggle();
	});
})
*/