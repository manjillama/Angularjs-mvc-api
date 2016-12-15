(function($, document, window){

	$(document).ready(function(){

		// Cloning main navigation for mobile menu
		$(".mobile-navigation").append($(".main-navigation .menu").clone());

		// Mobile menu toggle
		$(".menu-toggle").click(function(){
			$(".mobile-navigation").slideToggle();
		});

		var map = $(".map");
		var latitude = 27.723166033382576;
		var longitude = 85.35961853587649;
		if( map.length ){

			map.gmap3({
				map:{
					options:{
						center: [latitude,longitude],
						zoom: 13,
						scrollwheel: false
					}
				},
				marker:{
					latLng: [latitude,longitude],
				}
			});

		}
	});

	$(window).load(function(){

	});

})(jQuery, document, window);
