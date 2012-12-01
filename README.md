# Lunch Registration
Lunch Registration is a small application created to keep track of the daily lunch registration at work.


## Overview
There is a Frontend (index.html) and a Backend (backend.php).

Purpose of the Frontend:
- Request and receive today's lunch state from the backend.
- Display the users as tiles and make them fit on screen. 
- Adjust the user tiles when resizing the screen.
- Update the user's lunch state when clicked on the picture.
- Send back the updated lunch state to the backend when clicked on the "Register Lunch" button.

Purpose of the Backend:
- Display an overview of the lunch history when accessed directly.
- Create and output a JSON string for the Frontend when receiving the GET request "?a=getlunchday&day=YYYYMMDD"
- Receive JSON information from the frontend when receiving the GET request "?a=setlunchday&day=YYYYMMDD"
- Update the lunch history in a CSV file (lunchhistory.csv).


## Thirdparty code and assets
- jquery libs     : jQuery v1.8.2 jquery.com | jquery.org/license
- js/date.js      : Copyright (c) 2006-2007, Coolite Inc. (http://www.coolite.com/). All rights reserved.
- css/animate.css : Copyright (c) 2012 Dan Eden - http://daneden.me/animate
- users/*.jpg     : "Customer, head, male, man, user icon" & "Female, lady, user, woman icon" & "Blue user png, head, man, personal, user icon"  / By Everaldo Coelho - http://www.everaldo.com/
- users/*.jpg     : "Administrator, employee, male, man, manager, operator, personal, user icon" / David Vignoni - http://www.icon-king.com/
- users/*.jpg     : "Green, red, user icon" & "Guy, red, user icon" / Alessandro Rei - http://www.kde-look.org/usermanager/search.php?username=mentalrey
- users/*.jpg     : "Anonymous, male, man, user icon" / DryIcons - http://dryicons.com
- users/*.jpg     : "Female, user, woman icon" / Alexandre Moore - http://sa-ki.deviantart.com/
