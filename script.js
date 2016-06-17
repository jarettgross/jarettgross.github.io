var isRightArrow = true;
var isNavReset = true;

$(document).ready(function() {
	var myIcons = new SVGMorpheus("#svg-controller");
	
	$("#svg-controller").click(function() {
		if (isRightArrow) { //close navbar
			var arrowWidth = 2 + (2380 / document.documentElement.clientWidth) + "vw";
			myIcons.to("right-arrow", {duration: 1000, easing: "linear", rotation: "none"});	
			jQuery(".nav").animate({ width: arrowWidth }, 1000, "swing", function() {
				$(".nav-wrapper").css("transform", "translateX(0%)");
				$(".nav-wrapper").css("-webkit-transform", "translateX(0%)");
				$(".nav-wrapper").css("-moz-transform", "translateX(0%)");
				$(".nav-wrapper").css("-o-transform", "translateX(0%)");
			});
		} else { //open navbar
			myIcons.to("left-arrow", {duration: 1000, easing: "linear", rotation: "none"});
			jQuery(".nav").animate({ width: "100%" }, 1000, "swing");
			$(".nav-wrapper").css("transform", "translateX(-50%)");
			$(".nav-wrapper").css("-webkit-transform", "translateX(-50%)");
			$(".nav-wrapper").css("-moz-transform", "translateX(-50%)");
			$(".nav-wrapper").css("-o-transform", "translateX(-50%)");
			isNavReset = false;
		}
		isRightArrow = !isRightArrow;
	});
	
	$(document).scroll(function() {
		if (document.documentElement.scrollTop != 0 && isRightArrow && isNavReset) {
			var arrowWidth = 2 + (2380 / document.documentElement.clientWidth) + "vw";
			myIcons.to("right-arrow", {duration: 1000, easing: "linear", rotation: "none"});	
			jQuery(".nav").animate({ width: arrowWidth }, 1000, "swing", function() {
				$(".nav-wrapper").css("transform", "translateX(0%)");
				if (document.documentElement.scrollTop == 0) {
					$(".nav-wrapper").css("transform", "translateX(-50%)");
					$(".nav-wrapper").css("-webkit-transform", "translateX(-50%)");
					$(".nav-wrapper").css("-moz-transform", "translateX(-50%)");
					$(".nav-wrapper").css("-o-transform", "translateX(-50%)");
				}
			});
			isRightArrow = !isRightArrow;
		} else if (document.documentElement.scrollTop == 0 && !isRightArrow) {
			myIcons.to("left-arrow", {duration: 1000, easing: "linear", rotation: "none"});
			jQuery(".nav").animate({ width: "100%" }, 1000, "swing");
			$(".nav-wrapper").css("transform", "translateX(-50%)");
			isRightArrow = !isRightArrow;
		}
		if (document.documentElement.scrollTop == 0) {
			isNavReset = true;
		}
	});
	
	$(window).resize(function(){
		if (!isRightArrow) {
			var arrowWidth = 2 + (2380 / document.documentElement.clientWidth) + "vw";
			$(".nav").css("width", arrowWidth);
		}
	});
	
	$("#scroll-down-button").click(function() {
		$('html, body').animate({
			scrollTop: $("#about").offset().top
		}, 1000);
	});
});