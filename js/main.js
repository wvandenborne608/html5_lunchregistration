
$(document).ready(function () {

	var url   = "backend.php";                                                      // file (or url) to the backend file for requesting and sending JSON data.
	var today = Date.parse('today');                                              //get today's date
	
	lunchregistration.loadTodayInformation(url, today.toString('yyyyMMdd') );     //request and process today's lunch information
    lunchregistration.drawLunchArea();                                            //Display the users
	
	$(".userPictureImg").bind("click", function(){                                //When clicked on an image..
		lunchregistration.toggleUser($(this).attr("alt"), $(this).attr("id"));    //Then update the user state and change/toggle the style.
    });
	
	$("#registreer").bind("click", function(){                                    //When clicked on the register button..
		lunchregistration.sendTodayInformation(url, today.toString('yyyyMMdd') ); //Create a JSON string and submit it to the admin file
		$(this).html("Lunch registered!");                                        //Give feedback by changing the text on the button.
    });
	
	$(window).bind('resize', function () {                                         //On a resize (or when changing the screen orientation..
		lunchregistration.drawLunchArea();                                         //Call the DrawLunchArea method again to redraw the screen.
	});		
	
});


