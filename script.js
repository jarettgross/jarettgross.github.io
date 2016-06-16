var isRightArrow = true;
var arrowWidth = (2420 / document.documentElement.clientWidth) + "vw";

$(document).ready(function() {
	var myIcons = new SVGMorpheus("#svg-controller");
	
	$("#svg-controller").click(function() {
		if (isRightArrow) {
			myIcons.to("right-arrow", {duration: 1000, easing: "linear", rotation: "none"});	
			jQuery(".nav").animate({ width: arrowWidth, right: "0%" }, 1000, "swing");
			$("#nav-top").css("display", "none");
			$(".nav-wrapper").css("display", "none");
		} else {
			myIcons.to("left-arrow", {duration: 1000, easing: "linear", rotation: "none"});
			jQuery(".nav").animate({ width: "100%", right: "0%" }, 1000, "swing");
			$("#nav-top").css("display", "inline");
			$(".nav-wrapper").css("display", "inline-flex");
		}
		isRightArrow = !isRightArrow;
	}); 
});