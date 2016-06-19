var isRightArrow = true;
var isNavReset = true;

$(document).ready(function() {
	var myIcons = new SVGMorpheus("#svg-controller");
	
	//Control navbar on arrow click
	$("#svg-controller").click(function() {
		if (isRightArrow) { //close navbar
			var arrowWidth = 2 + (2380 / document.documentElement.clientWidth) + "vw";
			myIcons.to("right-arrow", {duration: 1000, easing: "linear", rotation: "none"});	
			$(".nav").animate({ width: arrowWidth }, 1000, "swing", function() {
				$(".nav-wrapper").css("transform", "translateX(0%)");
				$(".nav-wrapper").css("-webkit-transform", "translateX(0%)");
				$(".nav-wrapper").css("-moz-transform", "translateX(0%)");
				$(".nav-wrapper").css("-o-transform", "translateX(0%)");
			});
		} else { //open navbar
			myIcons.to("left-arrow", {duration: 1000, easing: "linear", rotation: "none"});
			$(".nav").animate({ width: "100%" }, 1000, "swing");
			$(".nav-wrapper").css("transform", "translateX(-50%)");
			$(".nav-wrapper").css("-webkit-transform", "translateX(-50%)");
			$(".nav-wrapper").css("-moz-transform", "translateX(-50%)");
			$(".nav-wrapper").css("-o-transform", "translateX(-50%)");
			isNavReset = false;
		}
		isRightArrow = !isRightArrow;
	});
	
	//Control navbar on scroll
	$(document).scroll(function() {
		if (document.documentElement.scrollTop != 0 && isRightArrow && isNavReset) {
			var arrowWidth = 2 + (2380 / document.documentElement.clientWidth) + "vw";
			myIcons.to("right-arrow", {duration: 1000, easing: "linear", rotation: "none"});	
			$(".nav").animate({ width: arrowWidth }, 1000, "swing", function() {
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
			$(".nav").animate({ width: "100%" }, 1000, "swing");
			$(".nav-wrapper").css("transform", "translateX(-50%)");
			isRightArrow = !isRightArrow;
		}
		if (document.documentElement.scrollTop == 0) {
			isNavReset = true;
		}
	});
	
	
	//Change navbar width on window resize
	$(window).resize(function(){
		if (!isRightArrow) {
			var arrowWidth = 2 + (2380 / document.documentElement.clientWidth) + "vw";
			$(".nav").css("width", arrowWidth);
		}
	});
	
	//Click button to scroll to first section
	$("#scroll-down-button").click(function() {
		$('html, body').animate({
			scrollTop: $("#about").offset().top
		}, 1000);
	});
	
	$("#send-email").click(function() {
		var canSend = true;
		if ($("#email-message").val() == "") {
			canSend = false;
			var shakeValue = 4;  
			for( var i = 0; i < 6; i++ ) {
				$("#email-message").animate( { 
					"margin-left": "+=" + (shakeValue = -shakeValue) + "px",
					"margin-right": "-=" + shakeValue + "px"
				}, 20);  
				$("#email-message").css("box-shadow", "0 0 5px #FF0000");
				$("#email-message").css("-webkit-box-shadow", "0 0 5px #FF0000");
				$("#email-message").css("-moz-box-shadow", "0 0 5px #FF0000");
			}
		} else {
			$("#email-message").css("box-shadow", "none");
			$("#email-message").css("-webkit-box-shadow", "none");
			$("#email-message").css("-moz-box-shadow", "none");
		}
		
		var emailAddressFormat = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
		if ($("#email-from").val() == "" || !emailAddressFormat.test($("#email-from").val())) {
			canSend = false;
			var shakeValue = 2;  
			for( var i = 0; i < 6; i++ ) {
				$("#email-from").animate( { 
					"margin-left": "+=" + (shakeValue = -shakeValue) + "px",
					"margin-right": "-=" + shakeValue + "px"
				}, 20);  
				$("#email-from").css("box-shadow", "0 0 5px #FF0000");
				$("#email-from").css("-webkit-box-shadow", "0 0 5px #FF0000");
				$("#email-from").css("-moz-box-shadow", "0 0 5px #FF0000");
			}
		} else {
			$("#email-from").css("box-shadow", "none");
			$("#email-from").css("-webkit-box-shadow", "none");
			$("#email-from").css("-moz-box-shadow", "none");
		}
		
		if (canSend) {
			$.ajax({
				url: "https://formspree.io/jarett@wustl.edu",
				method: "POST",
				data: { message: $("#email-message").val(), _replyto: $("#email-from").val() },
				dataType: "json",
				success: function() {
					$("#email-message").css("box-shadow", "0 0 5px #00FF15");
					$("#email-message").css("-webkit-box-shadow", "0 0 5px #00FF15");
					$("#email-message").css("-moz-box-shadow", "0 0 5px #00FF15");

					$("#email-from").css("box-shadow", "0 0 5px #00FF15");
					$("#email-from").css("-webkit-box-shadow", "0 0 5px #00FF15");
					$("#email-from").css("-moz-box-shadow", "0 0 5px #00FF15");

					$("#send-email").addClass("no-hover");
					$("#send-email").css("background-color", "#33CC40");
					$("#send-email").css("cursor", "initial");
					$("#send-email").css("pointer-events", "none");
					$("#send-email").html("Sent!");
				}
			});
		}
	});
});