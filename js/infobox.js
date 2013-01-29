$(document).ready(function() {

	//parse a json data
	$.getJSON("json/info_box.json", function(data) {

	//build list of items	
	jQuery.each(data, function(i, val) {
		$('.infobox-body-list').append(
			'<div class="infobox-body__item"><img class="infobox-body-image" src="images/'+ val.img +'"/><div class="infobox-cont"><div class="infobox-txtwrapper"><div class="infobox-cont-header">'+ val.title +'</div><div class="infobox-cont-body">'+ val.description +'</div><div class="infobox-cont-note">'+ val.note +'</div></div><a href="#" open="false" class="infobox-cont-details">show details</a></div></div>');
	});

	console.log(dust);

	//give the 1st element class active for slider
	$('.infobox-body-list .infobox-body__item:first').addClass('active');
	$('.infobox-action-btn').click(function() {	
		var next;
		var current_image = $('.infobox-body-list .infobox-body__item.active');
		var button = $(this).attr('id');
		if (button == 'prev') {
			next = ($('.infobox-body-list .infobox-body__item.active').prev().length > 0) ?
			$('.infobox-body-list .infobox-body__item.active').prev() :
			$('.infobox-body-list .infobox-body__item:last');
		}else if(button == 'next') {
			next = ($('.infobox-body-list .infobox-body__item.active').next().length > 0) ?
			$('.infobox-body-list .infobox-body__item.active').next() :
			$('.infobox-body-list .infobox-body__item:first');
		} 
		next.css('z-index', 2).fadeIn();	
		current_image.fadeOut(300, function() {
		$(this).css('z-index', 1).removeClass('active');
		next.css('z-index', 3).addClass('active').fadeIn();

		});	
	});	

	//show details animation
	$('.infobox-cont-details').toggle(function() {	
		$(this).parents('.infobox-body__item').find('.infobox-body-image').fadeOut('slow');

		$(this).prev('.infobox-txtwrapper').animate({
			"margin-top":"0"
		},100, "linear").animate({height:'+=190'}, 300, function(){
		 	$(this).next('.infobox-cont-details').css({'position':'absolute'});
		 });	
			
		
		$(this).html('hide details');
	},function(){
		$(this).parents('.infobox-body__item').find('.infobox-body-image').fadeIn('slow');

		$(this).prev('.infobox-txtwrapper').animate({
			"height":"-=190"
		},100, "linear").animate({'margin-top':'200px'}, 300, function(){
		 	$(this).next('.infobox-cont-details').css({'position':'relative'});
		 });	
		
		$(this).html('show details');
	});
	});
});
