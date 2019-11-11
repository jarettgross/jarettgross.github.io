var show = "";

$(window).resize(function() {
    $(".header").css("height", $(window).height());
    $(".full-content").css("min-height", $(window).height());
    $(".half-content").css("min-height", 0.5 * $(window).height());
});

$(document).ready(function() {
    // Send email on click, checking that form is properly filled in
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
        
        // Check for an email and that it's properly formatted
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
        
        // Send email if possible
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
    
    // Project Displays
    $(".display").click(function() {
        prepareShow($(this).attr("id"));
    });

    // Buttons for going through images of a project
    $(".control-prev").click(function () {
        $(".open .slides ul li:last-child").prependTo(".open .slides ul");
    });
    
    $(".container-horizontal").click(function(e) {
        if (!$(e.target).parents('.container-horizontal').length > 0) {
            $(".open").removeClass("open");
            $('.container-horizontal').css('display', 'none');
            $(show).css('display', 'none');
        }
    });
    
    // Procedural Generation
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
        }, false);

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
        }, false);
});


function prepareShow(id) {
    var imageWidth;
    var imageHeight;
    show = "#" + id + "-show";
    var horizontalHeight = 500;
    
    if (id == "planet") {
        imageWidth = "400";
        imageHeight = "300";
    } else if (id == "playship") {
        imageWidth = "200";
        imageHeight = "300";
    } else if (id == "summate") {
        imageWidth = "250";
        imageHeight = "300";
    } else if (id == "tunnel") {
        imageWidth = "500";
        imageHeight = "300";
    } else if (id == "procGen") {
        imageWidth = "500";
        imageHeight = "510";
        horizontalHeight = 600;
    } else if (id == "boiler-escape") {
        imageWidth = "500";
        imageHeight = "300";
    } else if (id == "evening-joe") {
        imageWidth = "500";
        imageHeight = "300";
    }
    
    $('.horizontal').css('height', "" + horizontalHeight + "px");
    $('.container-horizontal').css('display', 'block');
    $(show).css('display', 'inline-block');

    // Set width based on show
    $(".slides").css("width", imageWidth + "px");
    $(".slides div ul li").css("width", imageWidth + "px");
    $(show).addClass("open");
}