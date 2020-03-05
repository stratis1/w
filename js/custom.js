/*
Copyright (c) 2017 
------------------------------------------------------------------


-------------------------------------------------------------------*/

(function ($) {
	"use strict";
	var TennisClub = {
		initialised: false,
		version: 1.0,
		mobile: false,
		init: function () {

			if(!this.initialised) {
				this.initialised = true;
			} else {
				return;
			}

			/*-------------- TennisClub Functions Calling ---------------------------------------------------
			------------------------------------------------------------------------------------------------*/
			this.RTL();
			this.Masonry();
			this.Magnific_popup();
			this.ClientSlider();
			this.MainSlider();
			this.ConutTo();
			this.TestimonialSlider();
			this.ContactFormSubmit();
			
		},
		
		/*-------------- TennisClub Functions definition ---------------------------------------------------
		---------------------------------------------------------------------------------------------------*/
		RTL: function () {
			// On Right-to-left(RTL) add class 
			var rtl_attr = $("html").attr('dir');
			if(rtl_attr){
				$('html').find('body').addClass("rtl");	
			}		
		},
		//mesonry content
		Masonry: function(){
			if($('.grid').length > 0){	
				$('.grid').isotope({
				  itemSelector: '.grid-item',
				  masonry: {
					columnWidth: '.grid-sizer'
				  }
				});
			}
		},
		//counter on home page
		ConutTo: function(){
			if($('.timer').length > 0){	
				$('.timer').appear(function() {
					$(this).countTo();
				});
			}
		},
		//Client slider on home page
		ClientSlider: function(){
			if($('.tc_client_slider .owl-carousel').length > 0){		
				$('.tc_client_slider .owl-carousel').owlCarousel({
					margin:30,
					nav: false,
					// // navText:['<i class="fa fa-angle-left"></i>','<i class="fa fa-angle-right"></i>'],
					dots: false,
					autoplay:true,
					smartSpeed:450,
					loop:true,
					responsive:{
						0:{
							items:1
						},
						600:{
							items:1
						},
						768:{
							items:3
						},
						992:{
							items:5
						},
						1200:{
							items:5
						}
					}
				});
			}
		},
		//Testimonial slider on home page
		TestimonialSlider: function(){
			if($('.tc_testimonial_slider .owl-carousel').length > 0){		
				$('.tc_testimonial_slider .owl-carousel').owlCarousel({
					nav: false,
					dots: false,
					autoplay:false,
					center: true,
					loop:true,
					responsive:{
						0:{
							items:1
						},
						600:{
							items:1
						},
						768:{
							items:1
						},
						992:{
							items:3
						},
						1200:{
							items:3
						}
					}
				});
			}
		},
		MainSlider: function(){
			if($('.tc_slider_wrapper .owl-carousel').length > 0){	
			  var owl = $('.tc_slider_wrapper .owl-carousel');	
			  // Carousel initialization
			  owl.owlCarousel({
				  loop:true,
				  margin:0,
				  navSpeed:300,
				  nav:false,
				  autoplay: true,
				  items:1
			  });


			  // add animate.css class(es) to the elements to be animated
			  function setAnimation ( _elem, _InOut ) {
				// Store all animationend event name in a string.
				// cf animate.css documentation
				var animationEndEvent = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';

				_elem.each ( function () {
				  var $elem = $(this);
				  var $animationType = 'animated ' + $elem.data( 'animation-' + _InOut );

				  $elem.addClass($animationType).one(animationEndEvent, function () {
					$elem.removeClass($animationType); // remove animate.css Class at the end of the animations
				  });
				});
			  }

			// Fired before current slide change
			  owl.on('change.owl.carousel', function(event) {
				  var $currentItem = $('.owl-item', owl).eq(event.item.index);
				  var $elemsToanim = $currentItem.find("[data-animation-out]");
				  setAnimation ($elemsToanim, 'out');
			  });

			// Fired after current slide has been changed
			  owl.on('changed.owl.carousel', function(event) {

				  var $currentItem = $('.owl-item', owl).eq(event.item.index);
				  var $elemsToanim = $currentItem.find("[data-animation-in]");
				  setAnimation ($elemsToanim, 'in');
			  })

			}
		},
		//Magnific Popuo
		Magnific_popup: function() {
            $('.tc_button_overlay .zoom_icon').magnificPopup({
				type: 'image',
				gallery: {
					enabled: true
				}
			}); 
        }, 
		//contact form submition
		ContactFormSubmit: function(){
			if($('#send_btn').length > 0){	
				$("#send_btn").on("click", function() {
					var e = $("#ur_name").val();
					var t = $("#ur_mail").val();
					// var ph = $("#ur_phone").val();
					var s = $("#sub").val();
					var r = $("#msg").val();
					$.ajax({
						type: "POST",
						url: "ajaxmail.php",
						data: {
							username: e,
							useremail: t,
					// userphone: ph,
							usersub: s,
							mesg: r
						},
						success: function(n) {
							var i = n.split("#");
							if (i[0] == "1") {
								$("#ur_name").val("");
								$("#ur_mail").val("");
								// $("#ur_phone").val("");
								$("#sub").val("");
								$("#msg").val("");
								$("#err").html(i[1]);
							} else {
								$("#ur_name").val(e);
								$("#ur_mail").val(t);
								// $("#ur_phone").val(ph);
								$("#sub").val(s);
								$("#msg").val(r);
								$("#err").html(i[1]);
							}
						}
					});
				});
			}
		 }
		
		
		   
	};

	TennisClub.init();

	// Load Event
	// Loader js
	$(window).on('load', function() {
		jQuery("#tc_preloader_box").fadeOut();
		jQuery("#tc_preloader_wrapper").delay(350).fadeOut("slow");
	 });

	// Scroll Event

	$(window).on('scroll', function () {
        if ($(this).scrollTop() >100) {
	    	$(".tc_gototop").fadeIn()
		} else {
	    	$(".tc_gototop").fadeOut()
		}
	
	});
	
	

    $(window).ready(function(e) {
        $(".tc_gototop").on("click", function() {
			$("html, body").animate({
			scrollTop: 0
			}, 600);
			return false
		});
    });
}(jQuery));
