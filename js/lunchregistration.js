var lunchregistration = (function () {
	this.arUsers = {};
	this.userCount = 0;

	
	/***********************************************************************
	Input:  user   (the username used as key to get the lunch state from the array)
		    div_id (passing the id of the div to access and update the properties)
	Output: - 
	Descr:  This will check the current lunch state of the user and style the users HTML accordingly
	***********************************************************************/
	function toggleUser(user, div_id) {
		if (this.arUsers[user]!=1) { //if the users' state is not active
			this.arUsers[user]=1;    //then make it active, and apply the "enabled" css styling (after removing the "disabled" css styling.
			$("#" + div_id).closest('div').removeClass("userPictureDiv_disabled");    //just in case, i guess.
			$("#" + div_id).closest('div').addClass("userPictureDiv_enabled");        //style the main div to be enabled.
			$("#" + div_id).closest('img').removeClass("userPictureImg_disabled");    //just in case, i guess.
			$("#" + div_id).closest('img').addClass("userPictureImg_enabled");        //style the image to be enabled.
			$("#" + div_id).closest('div').removeClass("animated shake");             //just in case, i guess.
			$("#" + div_id).closest('div').addClass("animated bounce");               //add a nice bouncy effect
			$("#" + div_id.replace("img","p")).removeClass("userPicture_p_disabled"); //just in case, i guess.
			$("#" + div_id.replace("img","p")).addClass("userPicture_p_enabled");     //style the name label P to be enabled.
		} else {                    //else, if the user is active..
			this.arUsers[user]=0;   //then make it inactive, and apply the "enabled" css styling (after removing the "enabled" css styling.
			$("#" + div_id).closest('div').removeClass("userPictureDiv_enabled");     //just in case, i guess.
			$("#" + div_id).closest('div').addClass("userPictureDiv_disabled");       //Apply the "disabled" style to the main div
			$("#" + div_id).closest('img').removeClass("userPictureImg_enabled");     //just in case, i guess.
			$("#" + div_id).closest('img').addClass("userPictureImg_disabled");       //Apply the "disabled" style to image.
			$("#" + div_id).closest('div').removeClass("animated bounce");            //just in case, i guess. 
			$("#" + div_id).closest('div').addClass("animated shake");                //apply the shake animation
			$("#" + div_id.replace("img","p")).removeClass("userPicture_p_enabled");  //just in case, i guess.
			$("#" + div_id.replace("img","p")).addClass("userPicture_p_disabled");    //Apply the "disabled" style to the name label P.
		} //end if
	} //end function
	
	
	/***********************************************************************
	Input:  -
	Output:  Integer value. The amount of users in found in the associative array
	Descr:  Since we are working with an associative array, I'm using this loop to count the elements
	***********************************************************************/
	function getUserCount() {
		var usersCount = 0;
		for(var e in this.arUsers)
			if(this.arUsers.hasOwnProperty(e))
				usersCount++;
		return usersCount;
	} //end function
	
	
	/***********************************************************************
	Input:  -
	Output: -
	Descr:  This will display the user pictures (squares) on screen based on the screen size.
	***********************************************************************/
	function drawLunchArea() {
		var _usersCount = this.getUserCount();                            //get the amount of users.
		var lunchAreaWidth = $("#lunchArea").width();                     //get the width of the lunch area
		var lunchAreaHeight = $("html").height() - $("#navbar").height(); //calculate the available workspace height for the lunch area. (100% minus the navigation bar at the top)
		
		//calculate the size of the square(s) and estimate the amount of squares that will be positioned horizontally and vertically
		var divSquareSize         = Math.round( (Math.sqrt((lunchAreaWidth * lunchAreaHeight) / _usersCount))); //calculate the initial size of a square
		var tempHorizontalAmount  = Math.floor(lunchAreaWidth / divSquareSize);    //Estimate the amount of squares that will be positioned initially horizontally.
		var tempVerticalAmount    = Math.ceil(_usersCount / tempHorizontalAmount); //Estimate the amount of squares that will be positioned initially vertically.

		//Adjust the size of the square to prevent them to be displayed off screen.
		if ((tempVerticalAmount * divSquareSize) > lunchAreaHeight)  //if the estimate (vertical) amount of squares exceed the available space (at the bottom)
			divSquareSize = (lunchAreaHeight / tempVerticalAmount)   //then adjust the divSquareSize to the maximum allowed squares. This should prevent the squares to go off-screen.
		
		//define a few extra factors to help style the HTML
		var divSquarePaddingSize = divSquareSize * 0.02; //calculate padding size
		    divSquareSize -=(divSquarePaddingSize*2); //re-adjust the square size based on the padding dimension.
		var PdivHeight = divSquareSize * 0.14; //calculate padding size
		var PfontSize = divSquareSize * 0.1; //calculate padding size
		
		$i=0;
		for(var index in this.arUsers) { //loop through all users.
			if ($("#userPicture" + $i + "_div").length == 0) { //if the div (square) hasn't been created,.. 
				$("#lunchArea").append("<div id=\"userPicture" + $i + "_div\" class='userPictureDiv' ></div>");  //then add it to the lunchArea.
					$("#userPicture" + $i + "_div").css("width",       divSquareSize  + "px"); 
					$("#userPicture" + $i + "_div").css("height",       divSquareSize  + "px");
					$("#userPicture" + $i + "_div").css("margin",       divSquarePaddingSize  + "px");
				$("#userPicture" + $i + "_div").append("<img id=\"userPicture" + $i + "_img\" src=\"users/" + index + ".jpg\"  class='userPictureImg' alt='" + index + "'>"); //add the image
					$("#userPicture" + $i + "_img").css("width",  "95%");
					$("#userPicture" + $i + "_img").css("height", "95%");
					$("#userPicture" + $i + "_img").css("margin",  "2.5%");
				$("#userPicture" + $i + "_div").append("<p id=\"userPicture" + $i + "_p\" class=\"userPicture_p\">" + index  + "</p>"); //and the name label (P)
					$("#userPicture" + $i + "_p").css("height",  PdivHeight);
					$("#userPicture" + $i + "_p").css("width",  divSquareSize);
					$("#userPicture" + $i + "_p").css("margin-top",  -PdivHeight);
					$("#userPicture" + $i + "_p").css("font-size",  PfontSize);
					
				if (this.arUsers[index]!=1) { //if the users' state is not active, then apply the "disabled" styling
					$("#userPicture" + $i + "_div").addClass("userPictureDiv_disabled");
					$("#userPicture" + $i + "_p").addClass("userPicture_p_disabled");
					$("#userPicture" + $i + "_img").addClass("userPictureImg_disabled");
				} else {                       //else apply the "enabled" styling.
					$("#userPicture" + $i + "_div").addClass("userPictureDiv_enabled");
					$("#userPicture" + $i + "_p").addClass("userPicture_p_enabled");
					$("#userPicture" + $i + "_img").addClass("userPictureImg_enabled");
				} //end else if
				
			} else { //else, if the div (square) already exist, then only update the sizes via CSS. (For example onResize you only need to update the dimensions because the Divs are already there. 
				$("#userPicture" + $i + "_div").css("width", divSquareSize + "px").animate("slow");
				$("#userPicture" + $i + "_div").css("height", divSquareSize + "px").animate("slow");
					$("#userPicture" + $i + "_p").css("height",  PdivHeight);
					$("#userPicture" + $i + "_p").css("width",  divSquareSize);
					$("#userPicture" + $i + "_p").css("margin-top",  -PdivHeight);
					$("#userPicture" + $i + "_p").css("font-size",  PfontSize);
			} //end else if
			$i++;
		} //end for
	} //end function

	
	/***********************************************************************
	Input:  url   (string value for the file name or url for contacting the backend file
		    today (formatted timestamp string YYYYMMDD)
	Output: 0 when failed. 1 when succeeded. While updating "this.arUsers".
	Descr:  This will contact the backend file and requests today's lunch state. 
	***********************************************************************/
	function loadTodayInformation(url, today) {
		var returnValue = {};
		$.ajax({
			type: 'GET',
			url: url + "?a=getlunchday&day=" + today,
			dataType: 'json',
			success: function(data) {           
				if (data != null) {
					$.each(data, function(name, value) { 
						returnValue[name] = value;
					});
				}
			},
			async: false
		});		
		
		var users_count = 0;
		for(var e in returnValue)
			if(returnValue.hasOwnProperty(e))
				users_count++;
		
		if (users_count > 0) {
			this.arUsers = returnValue;
			return 1;
		} else {
			return 0;
		}
	} //end function

	
	/***********************************************************************
	Input:  url   (string value for the file name or url for contacting the backend file
		    today (formatted timestamp string YYYYMMDD)
	Output: -     (It will display a success or fail message in the browser console.	   
	Descr:  This will contact the backend file and send today's current/updated lunch state via an ajax call.
	***********************************************************************/
	function sendTodayInformation(url, today) {
		$.ajax({
			type: "POST",
			dataType: "json",
			data: "users=" + JSON.stringify(this.arUsers),
			beforeSend: function(x) {
				if(x && x.overrideMimeType)
					x.overrideMimeType("application/json;charset=UTF-8");
			},
			url: url + "?a=setlunchday&day=" + today,
			success: function(data) {
				if (data.success == true){
					console.log(data.message);
				}
				else{
					console.log(data.message);
				}
			}
		});
	} //end function
	

	/***********************************************************************
	Expose object's methods
	***********************************************************************/
	return {
		toggleUser : toggleUser,
		getUserCount : getUserCount,
		loadTodayInformation : loadTodayInformation,
		sendTodayInformation : sendTodayInformation,
		drawLunchArea : drawLunchArea,
	};
	
	
})();

