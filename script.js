var isRightArrow = true;
var isNavReset = true;

var isShowOpen = false;
var prevShow = "";

$(window).resize(function(){
	$(".header").css("height", $(window).height());
	$(".full-content").css("min-height", $(window).height());
	$(".half-content").css("min-height", 0.5 * $(window).height());
	$("#scroll-down-button").css("margin-top", "calc(50vh - 100px)");
});

$(document).ready(function() {
	//Set properties in js so that mobile address bars don't change these properties
	
	var myIcons = new SVGMorpheus("#svg-controller");
	
	//Control navbar on arrow click
	$("#nav-controller").click(function() {
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
		if ($(document).scrollTop() > 0 && isRightArrow && isNavReset) {
			var arrowWidth = 2 + (2380 / document.documentElement.clientWidth) + "vw";
			myIcons.to("right-arrow", {duration: 1000, easing: "linear", rotation: "none"});	
			$(".nav").animate({ width: arrowWidth }, 1000, "swing", function() {
				$(".nav-wrapper").css("transform", "translateX(0%)");
				if ($(document).scrollTop() <= 0) {
					$(".nav-wrapper").css("transform", "translateX(-50%)");
					$(".nav-wrapper").css("-webkit-transform", "translateX(-50%)");
					$(".nav-wrapper").css("-moz-transform", "translateX(-50%)");
					$(".nav-wrapper").css("-o-transform", "translateX(-50%)");
				}
			});
			isRightArrow = !isRightArrow;
		} else if ($(document).scrollTop() <= 0 && !isRightArrow) {
			myIcons.to("left-arrow", {duration: 1000, easing: "linear", rotation: "none"});
			$(".nav").animate({ width: "100%" }, 1000, "swing");
			$(".nav-wrapper").css("transform", "translateX(-50%)");
			isRightArrow = !isRightArrow;
		}
		if ($(document).scrollTop() <= 0) {
			isNavReset = true;
		}
	});
	
	
	//Change project height, navbar width on window resize
	$(window).resize(function(){
		if (!isRightArrow) {
			var arrowWidth = 2 + (2380 / document.documentElement.clientWidth) + "vw";
			$(".nav").css("width", arrowWidth);
		}
		
		//project height, not on mobile
		if (document.documentElement.clientWidth >= 1200) {
			$(".slides div ul li").css("height", "500px");
			$(".show-wrapper").css("height", "500px");
			$(".control-next").css("margin-left", $(".slides div ul li").width() - 28.2667 + "px");
			if (prevShow == "procGen") {
				$("#" + prevShow + "-show").animate({ height: "600px" }, 500, "swing");
			} else {
				$("#" + prevShow + "-show").animate({ height: "500px" }, 500, "swing");
			}
		} else {
			if (prevShow != "summate") {
				var newMargin = 0.9 * $(".horizontal").width();
			} else {
				var newMargin = 0.9 * 250;
			}
			$(".control-next").css("margin-left", newMargin - 28.2667 + "px");
			if (prevShow == "procGen") {
				$("#" + prevShow + "-show").animate({ height: "1000px" }, 500, "swing");
			} else {
				$("#" + prevShow + "-show").animate({ height: "900px" }, 500, "swing");
			}
		}
	});
	
	//Click button to scroll to first section
	$("#scroll-down-button").click(function() {
		$('html, body').animate({
			scrollTop: $("#about").offset().top
		}, 1000);
	});
	
	//Send email on click, checking that form is properly filled in
	$("#send-email").click(function() {
		var canSend = true;
		//shake message box if not filled in, else remove shadow
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
		
		//check for an email and that it's properly formatted
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
		
		//send email if possible
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
					$("#send-email").html("SENT!");
				}
			});
		}
	});
	
	
	//PROJECT DISPLAYS
	$(".display").click(function() {
		//animate opening of project
		if (isShowOpen) {
			if (prevShow == $(this).attr("id")) {
				$(".open").animate({ height: "0" }, 500, "swing", function() {
					$(".open").css("display", "none");
					$(".open").removeClass("open");
				});
			} else { //close
				$(".open").animate({ height: "0" }, 500, "swing", 
					(function(id) {
						return function() {
							$(".open").css("display", "none");
							$(".open").removeClass("open");
							prepareShow(id);
						}
				})($(this).attr("id")));
			}
			isShowOpen = false;
		} else {
			prevShow = "";
			prepareShow($(this).attr("id"));
		}
	});

	//buttons for going through images of a project
    $(".control-prev").click(function () {
        $(".open .slides ul li:last-child").prependTo(".open .slides ul");
    });

    $(".control-next").click(function () {
        $(".open .slides ul li:first-child").appendTo(".open .slides ul");
    });
	
	
	//PROC GEN
	document.getElementById("roomTriesVar").innerHTML = ROOM_TRIES;
	document.getElementById("squareSizeVar").innerHTML = SQUARE_SIZE;
	draw();
	document.getElementById("createDungeonButton").addEventListener("click", function() { clearCanvas(); draw(); }, false);
	
	document.getElementById("roomTriesSlider").addEventListener("input",
		function() {
			ROOM_TRIES = document.getElementById("roomTriesSlider").value;
			if (ROOM_TRIES < 10) {
				document.getElementById("roomTriesVar").innerHTML = "0" + ROOM_TRIES;
			} else {
				document.getElementById("roomTriesVar").innerHTML = ROOM_TRIES;
			}
		}
	, false);

	document.getElementById("squareSizeSlider").addEventListener("input",
		function() {
			SQUARE_SIZE = parseInt(document.getElementById("squareSizeSlider").value);
			MIN_ROOM_SIZE = 4 * SQUARE_SIZE;
			MAX_ROOM_ADDITION = 4 * SQUARE_SIZE;
			HEIGHT_WIDTH_DIFFERENCE = 2 * SQUARE_SIZE;
			if (SQUARE_SIZE < 10) {
				document.getElementById("squareSizeVar").innerHTML = "0" + SQUARE_SIZE;
			} else {
				document.getElementById("squareSizeVar").innerHTML = SQUARE_SIZE;
			}
		}
	, false);
});


function prepareShow(id) {
	var screenWidthLevel;
	if (document.documentElement.clientWidth >= 1200) {
		screenWidthLevel = 2;
	} else if (document.documentElement.clientWidth >= 768) {
		screenWidthLevel = 1;
	} else {
		screenWidthLevel = 0;
	}
	
	var imageWidth;
	var show = "";
	//check which show is open, place show in place according to current screen width
	if (id == "playship") {
		show = ("#playship-show");
		imageWidth = "300";
		imageHeight = "300";
		if (screenWidthLevel == 2) { 	  $(show).insertAfter("#tunnel-wrap");   }
		else if (screenWidthLevel == 1) { $(show).insertAfter("#summate-wrap");  }
		else {							  $(show).insertAfter("#playship-wrap"); }

	} else if (id == "summate") {
		show = ("#summate-show");
		imageWidth = "250";
		imageHeight = "500";
		if (screenWidthLevel == 2) { 	  $(show).insertAfter("#tunnel-wrap");  }
		else if (screenWidthLevel == 1) { $(show).insertAfter("#summate-wrap"); }
		else {							  $(show).insertAfter("#summate-wrap"); }
		
	} else if (id == "tunnel") {
		show = ("#tunnel-show");
		imageWidth = "500";
		imageHeight = "300";
		if (screenWidthLevel == 2) { 	  $(show).insertAfter("#tunnel-wrap");  }
		else if (screenWidthLevel == 1) { $(show).insertAfter("#procGen-wrap"); }
		else {							  $(show).insertAfter("#tunnel-wrap");  }
		
	} else if (id == "procGen") {
		show = ("#procGen-show");
		imageWidth = "500";
		imageHeight = "300";
		if (screenWidthLevel == 2) { 	  $(show).insertAfter("#algorithms-wrap"); }
		else if (screenWidthLevel == 1) { $(show).insertAfter("#procGen-wrap");    }
		else {							  $(show).insertAfter("#procGen-wrap");    }
		
	} else if (id == "boiler-escape") {
		show = ("#boiler-escape-show");
		imageWidth = "500";
		imageHeight = "300";
		if (screenWidthLevel == 2) { 	  $(show).insertAfter("#algorithms-wrap");    }
		else if (screenWidthLevel == 1) { $(show).insertAfter("#algorithms-wrap");    }
		else {							  $(show).insertAfter("#boiler-escape-wrap"); }
		
	} else if (id == "algorithms") {
		show = ("#algorithms-show");
		imageWidth = "500";
		imageHeight = "300";
		if (screenWidthLevel == 2) { 	  $(show).insertAfter("#algorithms-wrap"); }
		else if (screenWidthLevel == 1) { $(show).insertAfter("#algorithms-wrap"); }
		else {							  $(show).insertAfter("#algorithms-wrap"); }
		
	} else if (id == "calendar") { 
		show = ("#calendar-show");
		imageWidth = "500";
		imageHeight = "300";
		if (screenWidthLevel == 2) { 	  $(show).insertAfter("#calendar-wrap"); }
		else if (screenWidthLevel == 1) { $(show).insertAfter("#calendar-wrap"); }
		else {							  $(show).insertAfter("#calendar-wrap"); }
	}

	isShowOpen = true;
	prevShow = id;
	
	//set width based on show
	$(".slides").css("width", imageWidth + "px");
	$(".slides div ul li").css("width", imageWidth + "px");
	
	$(show).addClass("open");
	if (document.documentElement.clientWidth >= 1200) { //side-by-side layout
		$(".slides div ul li").css("height", "500px");
		$(".show-wrapper").css("height", "500px");
		$(".control-next").css("margin-left", $(".slides div ul li").width() - 28.2667 + "px");
		if (id == "procGen") {
			$(show).animate({height: $(".slides div ul li").height() + 90 + "px" }, 500, "swing");
		} else {
			$(show).animate({ height: $(".slides div ul li").height() + 50 + "px" }, 500, "swing");
		}
	} else { //vertical layout
		$(".slides div ul li").css("height", imageHeight + "px");
		$(".show-wrapper").css("height", imageHeight + "px");
		if (id != "summate") {
			var newMargin = 0.9 * $(".horizontal").width();
		} else {
			var newMargin = 0.9 * 250;
		}
		$(".control-next").css("margin-left", newMargin - 28.2667 + "px");
		if (id == "summate" || id == "algorithms") {
			$(show).animate({ height: "700px" }, 500, "swing");
		} else {
			$(show).animate({ height: "600px" }, 500, "swing");
		}
	}
	$(show).css("display", "inline");
	
	//scroll to the show
	$('html, body').animate({
		scrollTop: $("#" + id).offset().top + $("#" + id).height()
	}, 1000);
}